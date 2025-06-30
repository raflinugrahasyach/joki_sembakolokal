import React from 'react';
import { useApp } from '../../hooks/useApp';
import { useCart } from '../../hooks/useCart';
import { HomeIcon, GridIcon, CartIcon } from '../../assets/icons';
import { UserCircleIcon } from '@heroicons/react/24/outline';


const BottomNav = () => {
    const { navigate, page } = useApp();
    const { cartCount } = useCart();

    // Hapus Admin dari navigasi bawah, ganti dengan 'Akun' (placeholder)
    const navItems = [
        { name: 'home', label: 'Home', icon: HomeIcon },
        { name: 'products', label: 'Produk', icon: GridIcon },
        { name: 'cart', label: 'Keranjang', icon: CartIcon, badge: cartCount },
        { name: 'account', label: 'Akun', icon: UserCircleIcon }, // Tombol Admin diubah jadi Akun
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = page.name === item.name;
                    // Fungsi navigasi diubah agar tombol 'Akun' tidak melakukan apa-apa untuk saat ini
                    const handlePress = () => {
                        if (item.name !== 'account') {
                            navigate(item.name)
                        } else {
                            // Arahkan ke halaman login admin jika tombol Akun ditekan
                            navigate('login');
                        }
                    }
                    return (
                        <button 
                            key={item.name} 
                            onClick={handlePress} 
                            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm transition-colors ${isActive ? 'text-green-600' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <div className="relative">
                                <Icon className="h-6 w-6"/>
                                {item.badge > 0 && (
                                    <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <span className={`mt-1 text-xs font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default BottomNav;
