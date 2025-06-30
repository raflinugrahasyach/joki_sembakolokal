import React from 'react';
import { useApp } from './hooks/useApp';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import BottomNav from './components/shared/BottomNav';
import LoadingSpinner from './components/shared/LoadingSpinner';

// Import Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage'; // Import halaman login baru

// Layout untuk Pengguna/Customer
const UserLayout = () => {
    const { page, loading } = useApp();

    const renderUserPage = () => {
        if (loading) {
            return <div className="flex justify-center items-center h-[60vh]"><LoadingSpinner /></div>;
        }
        switch (page.name) {
            case 'home': return <HomePage />;
            case 'products': return <ProductsPage />;
            case 'productDetail': return <ProductDetailPage />;
            case 'cart': return <CartPage />;
            case 'checkout': return <CheckoutPage />;
            default: return <HomePage />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-20 md:pt-24 pb-20 md:pb-0">
                {renderUserPage()}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};


function App() {
    const { page, isAdmin } = useApp();

    // Logika routing utama
    if (page.name === 'admin') {
        // Jika user mencoba akses /admin, cek apakah sudah login
        return isAdmin ? <AdminPage /> : <LoginPage />;
    }
    
    if (page.name === 'login') {
        // Tampilkan halaman login
        return <LoginPage />;
    }

    // Jika bukan halaman admin, tampilkan layout untuk user biasa
    return <UserLayout />;
}

export default App;
