import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';

const LoginPage = () => {
    // Ambil navigate dan loginAdmin dari context
    const { navigate, loginAdmin } = useApp();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Untuk demo, kita gunakan password sederhana yang di-hardcode.
        // Di aplikasi nyata, ini akan melibatkan panggilan API ke backend.
        if (password === 'admin123') {
            setError('');
            loginAdmin();      // 1. Set status admin menjadi true
            navigate('admin'); // 2. PERINTAH BARU: Arahkan pengguna ke halaman admin
        } else {
            setError('Kata sandi yang Anda masukkan salah.');
            setPassword(''); // Kosongkan input password setelah salah
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
                <h1 className="text-3xl font-black text-center text-slate-800">
                    Admin Login
                </h1>
                <p className="text-center text-slate-500">
                    Masukkan kata sandi untuk mengakses dasbor admin.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-shadow text-center"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-lg">
                            {error}
                        </p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all transform active:scale-95"
                        >
                            Masuk
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
