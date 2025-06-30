import React from 'react';
import { useApp } from '../../hooks/useApp'; // Import useApp

const Footer = () => {
    const { navigate } = useApp(); // Ambil fungsi navigate dari context

    return (
        <footer className="bg-slate-800 text-slate-300">
            <div className="container mx-auto py-12 px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Column 1: Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-xl font-black text-white tracking-tighter">Sembako<span className="text-green-400">Lokal</span></h3>
                        <p className="mt-4 text-sm text-slate-400">Platform belanja kebutuhan harian terlengkap, mudah, dan cepat. Semuanya ada, semua bisa diantar.</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold text-white">Tautan</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#" className="text-slate-400 hover:text-green-400">Tentang Kami</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-green-400">Cara Belanja</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-green-400">Pusat Bantuan</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-green-400">Karir</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 className="font-bold text-white">Hubungi Kami</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li className="text-slate-400">Jl. Pahlawan No. 10, Surabaya</li>
                            <li className="text-slate-400">halo@sembakolokal.id</li>
                            <li className="text-slate-400">(031) 555-1234</li>
                        </ul>
                    </div>

                    {/* Column 4: Lainnya */}
                    <div>
                         <h4 className="font-bold text-white">Lainnya</h4>
                         <ul className="mt-4 space-y-2 text-sm">
                            {/* TAMBAHAN BARU DI SINI */}
                            <li>
                                <button 
                                    onClick={() => navigate('login')} 
                                    className="text-slate-400 hover:text-green-400 text-left"
                                >
                                    Admin Login
                                </button>
                            </li>
                         </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
                    &copy; {new Date().getFullYear()} SembakoLokal. Dibuat dengan sepenuh hati di Surabaya.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
