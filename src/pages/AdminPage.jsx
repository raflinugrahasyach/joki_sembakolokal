import React, { useState } from 'react';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminAddProduct from '../components/admin/AdminAddProduct';
import AdminHistory from '../components/admin/AdminHistory';
import { useApp } from '../hooks/useApp'; // Import useApp

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { navigate } = useApp(); // Gunakan navigate dari context

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard': return <AdminDashboard />;
            case 'addProduct': return <AdminAddProduct />;
            case 'history': return <AdminHistory />;
            default: return <AdminDashboard />;
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-slate-50">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Admin Panel</h1>
                {/* Tambahkan tombol Logout */}
                <button 
                    onClick={() => navigate('logout')}
                    className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
            <div className="flex border-b border-slate-200 mb-8">
                <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-3 font-semibold ${activeTab === 'dashboard' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-slate-800'}`}>Dashboard</button>
                <button onClick={() => setActiveTab('addProduct')} className={`px-6 py-3 font-semibold ${activeTab === 'addProduct' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-slate-800'}`}>Tambah Barang</button>
                <button onClick={() => setActiveTab('history')} className={`px-6 py-3 font-semibold ${activeTab === 'history' ? 'border-b-2 border-green-500 text-green-600' : 'text-slate-500 hover:text-slate-800'}`}>Riwayat</button>
            </div>
            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AdminPage;
