import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useApp } from '../hooks/useApp';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { API_URL } = useApp();

    const fetchCart = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/cart`);
            if (!response.ok) throw new Error("Failed to fetch cart");
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (product, quantity) => {
        try {
            // Check if item already exists
            const existingItem = cartItems.find(item => item.productId === product.id);
            if (existingItem) {
                // Update quantity if it exists
                const newQuantity = existingItem.quantity + quantity;
                await fetch(`${API_URL}/cart/${existingItem.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ quantity: newQuantity }),
                });
            } else {
                // Add new item if it doesn't
                await fetch(`${API_URL}/cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        quantity,
                    }),
                });
            }
            await fetchCart(); // Refresh cart from server
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            if (newQuantity > 0) {
                await fetch(`${API_URL}/cart/${itemId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ quantity: newQuantity }),
                });
            } else {
                // Remove item if quantity is 0 or less
                await fetch(`${API_URL}/cart/${itemId}`, { method: 'DELETE' });
            }
            await fetchCart(); // Refresh cart
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };

    const clearCart = async () => {
        try {
            // Delete all items from the cart one by one
            const deletePromises = cartItems.map(item =>
                fetch(`${API_URL}/cart/${item.id}`, { method: 'DELETE' })
            );
            await Promise.all(deletePromises);
            setCartItems([]); // Immediately clear UI
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    };
    
    const checkout = async (customerData) => {
        try {
            // 1. Create the order
            await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer: customerData,
                    items: cartItems,
                    total: cartTotal + 15000, // Example shipping cost
                    status: "Baru",
                    createdAt: new Date().toISOString()
                })
            });
            // 2. Clear the cart
            await clearCart();
            return true;
        } catch (error) {
            console.error("Checkout failed:", error);
            return false;
        }
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const value = { cartItems, loading, addToCart, updateQuantity, clearCart, checkout, cartTotal, cartCount };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
