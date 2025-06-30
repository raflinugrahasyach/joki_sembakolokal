import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AppContext = createContext();
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const AppProvider = ({ children }) => {
    const [page, setPage] = useState({ name: 'home', params: {} });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // State baru untuk status login admin
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = (name, params = {}) => {
        // Jika admin mencoba logout, arahkan ke halaman login
        if (name === 'logout') {
            logoutAdmin();
            setPage({ name: 'login', params: {} });
            return;
        }
        setPage({ name, params });
        window.scrollTo(0, 0);
    };

    // Fungsi untuk login dan logout admin
    const loginAdmin = () => setIsAdmin(true);
    const logoutAdmin = () => setIsAdmin(false);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addProduct = async (productData) => {
        try {
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
            if (!response.ok) throw new Error('Failed to add product');
            await fetchProducts();
            return true;
        } catch (error) {
            console.error("Error adding product:", error);
            return false;
        }
    };

    // Tambahkan state & fungsi baru ke dalam value
    const value = { page, navigate, products, loading, addProduct, API_URL, isAdmin, loginAdmin, logoutAdmin };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
