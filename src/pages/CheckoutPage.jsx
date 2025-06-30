import React from 'react';
import { useCart } from '../hooks/useCart';
import { useApp } from '../hooks/useApp';

const CheckoutPage = () => {
    const { cartItems, cartTotal, checkout } = useCart();
    const { navigate } = useApp();
    const shippingCost = 15000;
    const finalTotal = cartTotal + shippingCost;

    const handleCheckout = async (e) => {
        e.preventDefault();
        const customerData = {
            name: e.target.name.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
            paymentMethod: e.target.payment.value
        };
        
        const success = await checkout(customerData);
        if (success) {
            alert("Pesanan berhasil dibuat! Terima kasih telah berbelanja.");
            navigate('home');
        } else {
            alert("Oops, terjadi kesalahan saat membuat pesanan. Silakan coba lagi.");
        }
    };

    if (cartItems.length === 0) {
        // Redirect to home if cart is empty
        navigate('home');
        return null;
    }
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-8">Checkout</h1>
            <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-slate-800">Alamat Pengiriman</h2>
                        <div className="space-y-4">
                            <input type="text" name="name" placeholder="Nama Lengkap Penerima" className="w-full p-3 border-2 rounded-lg" required />
                            <input type="tel" name="phone" placeholder="Nomor HP Aktif" className="w-full p-3 border-2 rounded-lg" required />
                            <textarea name="address" placeholder="Alamat Lengkap (Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan, Kota)" rows="4" className="w-full p-3 border-2 rounded-lg" required></textarea>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mt-8 mb-4">Metode Pembayaran</h2>
                        <div className="space-y-3">
                            <label className="flex items-center p-4 border-2 rounded-lg has-[:checked]:bg-green-50 has-[:checked]:border-green-500 transition-colors">
                                <input type="radio" name="payment" value="cod" className="w-5 h-5 mr-4" defaultChecked/>
                                <div>
                                    <p className="font-bold">Bayar di Tempat (COD)</p>
                                    <p className="text-sm text-slate-500">Siapkan uang pas saat kurir tiba.</p>
                                </div>
                            </label>
                            <label className="flex items-center p-4 border-2 rounded-lg has-[:checked]:bg-green-50 has-[:checked]:border-green-500 transition-colors">
                                <input type="radio" name="payment" value="transfer" className="w-5 h-5 mr-4"/>
                                <div>
                                    <p className="font-bold">Transfer Bank</p>
                                    <p className="text-sm text-slate-500">Nomor rekening akan diinfokan setelah pesanan dibuat.</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-28">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">Ringkasan Pesanan</h2>
                        <div className="space-y-2 max-h-60 overflow-y-auto border-b pb-4 mb-4">
                           {cartItems.map(item => (
                               <div key={item.id} className="flex justify-between text-sm">
                                   <span className="text-slate-600 pr-2">{item.name} x{item.quantity}</span>
                                   <span className="font-medium text-slate-800">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</span>
                               </div>
                           ))}
                        </div>
                        <div className="space-y-3 text-slate-600">
                           <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-slate-800">Rp{cartTotal.toLocaleString('id-ID')}</span></div>
                           <div className="flex justify-between"><span>Ongkir</span><span className="font-medium text-slate-800">Rp{shippingCost.toLocaleString('id-ID')}</span></div>
                        </div>
                        <div className="border-t my-4"></div>
                        <div className="flex justify-between font-bold text-xl text-slate-800">
                            <span>Total</span>
                            <span>Rp{finalTotal.toLocaleString('id-ID')}</span>
                        </div>
                        <button type="submit" className="mt-6 w-full bg-slate-800 text-white py-3 rounded-xl font-semibold text-lg hover:bg-slate-700 transition-colors transform active:scale-95">
                           Konfirmasi dan Buat Pesanan
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
