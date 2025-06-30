import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { useCart } from '../hooks/useCart';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ product }) => {
    const { navigate } = useApp();
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (isAdded) return;

        addToCart(product, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000); // Reset button state after 2 seconds
    };

    return (
        <div onClick={() => navigate('productDetail', { id: product.id })}
            className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="relative">
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-40 object-cover aspect-square transition-transform duration-300 group-hover:scale-105" 
                    onError={(e) => { e.target.src = 'https://placehold.co/400x400/e2e8f0/4a5568?text=Error'; }} 
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-semibold text-slate-800 h-10">{product.name}</h3>
                <div className="flex justify-between items-center mt-3">
                    <p className="text-lg font-black text-slate-900">Rp{product.price.toLocaleString('id-ID')}</p>
                    <button 
                        onClick={handleAddToCart}
                        className={`w-10 h-10 flex items-center justify-center text-white rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 ${isAdded ? 'bg-green-500' : 'bg-slate-800 group-hover:bg-cyan-500'}`}
                        aria-label="Tambah ke keranjang"
                    >
                        {isAdded ? <CheckIcon className="h-5 w-5"/> : <PlusIcon className="h-5 w-5"/>}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
