import React, { useState, useEffect } from 'react';
import { useApp } from '../../hooks/useApp';

const AdminDashboard = () => {
    const { products, API_URL } = useApp();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_URL}/orders`);
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };
        fetchOrders();
    }, [API_URL]);

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const lowStockProducts = products.filter(p => p.stock < 50);

    // Dummy logic for best selling item
    const bestSellingItem = products.length > 0 ? products[0].name : 'N/A';

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-slate-500">Total Penjualan</h3>
                    <p className="text-4xl font-extrabold text-green-600 mt-2">Rp{totalSales.toLocaleString('id-ID')}</p>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-slate-500">Barang Paling Laku</h3>
                    <p className="text-3xl font-bold text-slate-800 mt-2 truncate">{bestSellingItem}</p>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-slate-500">Jumlah Pesanan</h3>
                    <p className="text-4xl font-extrabold text-slate-800 mt-2">{orders.length}</p>
                </div>
            </div>
            {/* Low Stock Notification */}
            <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Notifikasi Stok Menipis (&lt; 50)</h3>
                <div className="bg-white p-4 rounded-xl shadow-md">
                    {lowStockProducts.length > 0 ? (
                        <ul className="divide-y divide-slate-200">
                            {lowStockProducts.map(p => (
                                <li key={p.id} className="py-3 flex justify-between items-center">
                                    <span className="font-medium text-slate-700">{p.name}</span>
                                    <span className="font-bold text-red-500 bg-red-100 px-3 py-1 rounded-full text-sm">Sisa: {p.stock}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500 p-4 text-center">Stok semua barang aman.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
