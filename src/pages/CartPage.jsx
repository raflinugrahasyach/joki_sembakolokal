import React from 'react';
import { useCart } from '../hooks/useCart';
import { useApp } from '../hooks/useApp';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const CartPage = () => {
    const { cartItems, updateQuantity, cartTotal, loading } = useCart();
    const { navigate } = useApp();
    const shippingCost = 15000;

    if (loading) {
        return <div className="flex justify-center py-20"><LoadingSpinner /></div>;
    }
    
    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto text-center py-20 px-4">
                <h1 className="text-3xl font-bold mb-4 text-slate-800">Keranjang Belanja Anda Kosong</h1>
                <p className="text-slate-600 mb-6">Sepertinya Anda belum menambahkan apa-apa. Ayo isi dengan barang kebutuhanmu!</p>
                <button onClick={() => navigate('products')} className="bg-slate-800 text-white py-3 px-8 rounded-full font-semibold hover:bg-slate-700 transition-colors">
                    Mulai Belanja
                </button>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-8">Keranjang Saya</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow-md">
                            <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                            <div className="flex-grow ml-4">
                                <h3 className="font-bold text-slate-800">{item.name}</h3>
                                <p className="text-sm text-slate-500">Rp{item.price.toLocaleString('id-ID')}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 border rounded-md font-bold hover:bg-slate-100">-</button>
                                    <span className="w-10 text-center font-semibold">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 border rounded-md font-bold hover:bg-slate-100">+</button>
                                </div>
                            </div>
                            <p className="w-32 text-right font-bold text-lg text-slate-800 ml-4">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</p>
                        </div>
                    ))}
                </div>
                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-28">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">Ringkasan Pesanan</h2>
                        <div className="space-y-3 text-slate-600">
                           <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium text-slate-800">Rp{cartTotal.toLocaleString('id-ID')}</span>
                           </div>
                           <div className="flex justify-between">
                                <span>Ongkos Kirim</span>
                                <span className="font-medium text-slate-800">Rp{shippingCost.toLocaleString('id-ID')}</span>
                           </div>
                        </div>
                        <div className="border-t my-4"></div>
                        <div className="flex justify-between font-bold text-xl text-slate-800">
                            <span>Total</span>
                            <span>Rp{(cartTotal + shippingCost).toLocaleString('id-ID')}</span>
                        </div>
                        <button onClick={() => navigate('checkout')} className="mt-6 w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-600 transition-colors transform active:scale-95">
                           Lanjut ke Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
