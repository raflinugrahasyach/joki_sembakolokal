import React from 'react';
import { useApp } from '../hooks/useApp';
import ProductCard from '../components/ProductCard';
import { GroceriesIcon, SnackIcon, DrinkIcon, FreshIcon, MomBabyIcon, HealthIcon, HomeIcon, BodyCareIcon } from '../assets/icons';

const categories = [
    { name: "Sembako", icon: GroceriesIcon },
    { name: "Makanan & Snack", icon: SnackIcon },
    { name: "Minuman", icon: DrinkIcon },
    { name: "Produk Segar", icon: FreshIcon },
    { name: "Perawatan Tubuh", icon: BodyCareIcon },
    { name: "Ibu & Anak", icon: MomBabyIcon },
    { name: "Kesehatan", icon: HealthIcon },
    { name: "Kebutuhan Rumah", icon: HomeIcon },
];

const HomePage = () => {
    const { navigate, products } = useApp();
    // Sort products by stock to get "best sellers" (dummy logic)
    const bestSellers = [...products].sort((a, b) => a.stock - b.stock).slice(0, 10);

    return (
        <div className="space-y-12 md:space-y-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="container mx-auto px-6 lg:px-8 py-20 md:py-32 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                        Kebutuhan Harian, <br />
                        <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">Diantar Dalam Sekejap</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
                        Dari beras sampai sabun mandi, temukan semua yang kamu butuhkan dengan harga jujur dan kualitas terjamin.
                    </p>
                    <button onClick={() => navigate('products')} className="mt-8 px-10 py-4 bg-white text-slate-900 font-bold rounded-full shadow-lg hover:bg-slate-200 transition-all transform hover:scale-105">
                        Belanja Sekarang!
                    </button>
                </div>
            </section>

            {/* Category Section */}
            <section className="container mx-auto px-6 lg:px-8 -mt-20 md:-mt-32">
                 <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center md:text-left">Jelajahi Kategori</h2>
                 <div className="grid grid-cols-4 md:grid-cols-8 gap-4 bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow-xl">
                    {categories.map(cat => {
                        const Icon = cat.icon;
                        return (
                            <div key={cat.name} onClick={() => navigate('products', { category: cat.name })} className="group flex flex-col items-center space-y-2 text-center cursor-pointer">
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-green-100 group-hover:text-green-600 transition-all transform group-hover:-translate-y-1">
                                    <Icon className="h-8 w-8 transition-colors" />
                                </div>
                                <span className="text-xs md:text-sm font-medium text-slate-600 group-hover:text-slate-800">{cat.name}</span>
                            </div>
                        )
                    })}
                </div>
            </section>
            
            {/* Best Sellers Section */}
            <section className="container mx-auto px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-8 text-slate-800">Paling Laris</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
                    {bestSellers.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
