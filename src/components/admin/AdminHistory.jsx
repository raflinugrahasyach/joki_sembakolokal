import React, { useState, useEffect } from 'react';
import { useApp } from '../../hooks/useApp';

const AdminHistory = () => {
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

    // Sort products by creation date if available, otherwise just use the order from API
    const newProducts = [...products].reverse();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* New Products History */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4 text-slate-800">Riwayat Barang Masuk</h3>
                <ul className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
                    {newProducts.map(p => (
                        <li key={p.id} className="py-3 flex justify-between">
                            <span className="font-medium text-slate-700">{p.name}</span>
                            <span className="text-sm text-slate-500">Stok: {p.stock}</span>
                        </li>
                    ))}
                </ul>
            </div>
             {/* Sold Items History */}
             <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4 text-slate-800">Riwayat Barang Terjual</h3>
                <ul className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
                    {orders.length === 0 && <p className="text-slate-500 p-4 text-center">Belum ada penjualan.</p>}
                    {orders.flatMap(order => 
                        order.items.map(item => (
                            <li key={`${order.id}-${item.productId}`} className="py-3 flex justify-between">
                                <div>
                                    <p className="font-medium text-slate-700">{item.name} <span className="text-sm font-normal">x{item.quantity}</span></p>
                                    <p className="text-xs text-slate-500">Order oleh: {order.customer.name}</p>
                                </div>
                                <span className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString('id-ID')}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminHistory;
