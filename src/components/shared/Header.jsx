import React from 'react';
import { useApp } from '../../hooks/useApp';
import { useCart } from '../../hooks/useCart';
import { CartIcon } from '../../assets/icons';
import { UserCircleIcon } from '@heroicons/react/24/outline'; // Import ikon baru

const Header = () => {
    const { navigate } = useApp();
    const { cartCount } = useCart();

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div 
                        onClick={() => navigate('home')} 
                        className="text-2xl font-black tracking-tighter text-slate-800 cursor-pointer"
                    >
                        Sembako<span className="text-green-500">Lokal</span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <button onClick={() => navigate('home')} className="text-slate-600 hover:text-green-500 font-medium transition-colors">Home</button>
                        <button onClick={() => navigate('products')} className="text-slate-600 hover:text-green-500 font-medium transition-colors">Produk</button>
                    </nav>

                    <div className="flex items-center space-x-4">
                        {/* Tombol Keranjang */}
                        <button onClick={() => navigate('cart')} className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
                            <CartIcon className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* TAMBAHAN BARU DI SINI: Tombol Login Admin untuk Desktop */}
                        <button 
                            onClick={() => navigate('login')} 
                            className="hidden md:flex items-center justify-center p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Admin Login"
                        >
                            <UserCircleIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
