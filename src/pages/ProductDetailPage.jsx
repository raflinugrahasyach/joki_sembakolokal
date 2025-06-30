import React, { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { useCart } from '../hooks/useCart';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { CheckIcon } from '@heroicons/react/24/solid';

const ProductDetailPage = () => {
    const { page, products } = useApp();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const foundProduct = products.find(p => p.id.toString() === page.params.id.toString());
        setProduct(foundProduct);
        setIsLoading(false);
    }, [page.params.id, products]);
    
    if (isLoading || !product) {
        return <div className="flex justify-center py-20"><LoadingSpinner /></div>;
    }

    const totalPrice = product.price * quantity;

    const handleAddToCart = () => {
        if (isAdded) return;
        addToCart(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2500);
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Product Image */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg object-contain aspect-square" />
                </div>

                {/* Product Details */}
                <div>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">{product.category}</span>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight my-3">{product.name}</h1>
                    <p className="text-4xl font-black text-slate-900 mb-4">Rp{product.price.toLocaleString('id-ID')}</p>
                    
                    <p className="text-slate-600 leading-relaxed">
                        {product.description || "Deskripsi untuk produk ini belum tersedia. Kami jamin kualitasnya terbaik untuk Anda."}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">Stok Tersedia: {product.stock} unit</p>

                    {/* Quantity Selector */}
                    <div className="mt-8 flex items-center gap-4">
                        <p className="font-semibold text-slate-700">Jumlah:</p>
                        <div className="flex items-center border-2 border-slate-200 rounded-lg">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg font-bold text-slate-600 hover:bg-slate-100 rounded-l-md">-</button>
                            <span className="px-6 py-2 text-lg font-bold w-16 text-center">{quantity}</span>
                            <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-4 py-2 text-lg font-bold text-slate-600 hover:bg-slate-100 rounded-r-md">+</button>
                        </div>
                    </div>

                    <div className="mt-4 text-2xl font-bold text-slate-800">
                        Total: <span className="text-green-600">Rp{totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button 
                        onClick={handleAddToCart} 
                        className={`mt-8 w-full flex items-center justify-center gap-3 bg-slate-800 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-slate-700 transition-all duration-300 transform active:scale-95 ${isAdded ? 'bg-green-600 hover:bg-green-600' : ''}`}
                    >
                        {isAdded ? (
                            <>
                                <CheckIcon className="h-6 w-6"/>
                                <span>Berhasil Ditambahkan</span>
                            </>
                        ) : (
                            "Masukkan ke Keranjang"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
