import React, { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const categories = [
    "Semua Kategori", "Sembako", "Makanan & Snack", "Minuman", "Produk Segar", "Perawatan Tubuh", "Ibu & Anak", "Kesehatan", "Kebutuhan Rumah"
];

const ProductsPage = () => {
    const { products, loading, page } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(page.params.category || 'Semua Kategori');

    useEffect(() => {
        // Update category if navigated with a category parameter
        if (page.params.category) {
            setSelectedCategory(page.params.category);
        }
    }, [page.params.category]);

    const filteredProducts = products
        .filter(p => selectedCategory === 'Semua Kategori' || p.category === selectedCategory)
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-8">Temukan Segalanya</h1>
            
            {/* Search and Filter Bar */}
            <div className="sticky top-20 bg-white/90 backdrop-blur-lg z-40 p-4 rounded-2xl shadow-md mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <input 
                        type="text" 
                        placeholder="Cari minyak, beras, sabun..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-shadow"
                    />
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="p-3 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-shadow"
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
            </div>
            
            {loading ? (
                <div className="flex justify-center py-20"><LoadingSpinner /></div>
            ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl font-semibold text-slate-700">Oops, produk tidak ditemukan!</p>
                    <p className="text-slate-500 mt-2">Coba kata kunci atau kategori lain.</p>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
