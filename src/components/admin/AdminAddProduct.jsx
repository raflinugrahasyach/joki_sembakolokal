import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';

const categories = [ "Sembako", "Makanan & Snack", "Minuman", "Produk Segar", "Perawatan Tubuh", "Ibu & Anak", "Kesehatan", "Kebutuhan Rumah"];

const AdminAddProduct = () => {
    const { addProduct } = useApp();
    const [productData, setProductData] = useState({
        name: '', category: 'Sembako', price: '', stock: '', imageUrl: '', description: ''
    });

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            ...productData,
            price: Number(productData.price),
            stock: Number(productData.stock),
        };
        
        const success = await addProduct(newProduct);
        if (success) {
            alert('Produk baru berhasil ditambahkan!');
            setProductData({ name: '', category: 'Sembako', price: '', stock: '', imageUrl: '', description: '' });
        } else {
            alert('Gagal menambahkan produk. Cek konsol untuk error.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Form Tambah Barang Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Nama Barang" value={productData.name} onChange={handleChange} className="w-full p-3 border-2 rounded-lg" required />
                <select name="category" value={productData.category} onChange={handleChange} className="w-full p-3 border-2 rounded-lg">
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input type="number" name="price" placeholder="Harga (contoh: 75000)" value={productData.price} onChange={handleChange} className="w-full p-3 border-2 rounded-lg" required />
                <input type="number" name="stock" placeholder="Stok Awal" value={productData.stock} onChange={handleChange} className="w-full p-3 border-2 rounded-lg" required />
                <input type="text" name="imageUrl" placeholder="URL Gambar Produk (dari placehold.co atau lainnya)" value={productData.imageUrl} onChange={handleChange} className="w-full p-3 border-2 rounded-lg" />
                <textarea name="description" placeholder="Deskripsi Singkat Produk" value={productData.description} onChange={handleChange} rows="3" className="w-full p-3 border-2 rounded-lg" />
                <button type="submit" className="w-full bg-slate-800 text-white py-3 rounded-xl font-semibold text-lg hover:bg-slate-700 transition-colors">
                    Simpan Produk
                </button>
            </form>
        </div>
    );
};

export default AdminAddProduct;
