'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { OrderSummary } from '../../components/OrderSummary';
import { 
  User, 
  MapPin, 
  Clock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Truck
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, user, location, finalTotal, clearCart } = useCart();

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');

  const [address, setAddress] = useState('Flat 402, Sai Balaji Apartments, Road No. 3');
  const [locality, setLocality] = useState(location.locality || 'Madhapur');
  const [pincode, setPincode] = useState(location.pincode || '500081');
  const [landmark, setLandmark] = useState('Near Metro Pillar C-1740');

  const [deliverySlot, setDeliverySlot] = useState<'express' | 'morning' | 'afternoon' | 'evening'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'netbanking'>('upi');

  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !pincode) return;

    // Generate Mock Order ID and save to sessionStorage for confirmation page
    const mockOrderId = `FK-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDetails = {
      orderId: mockOrderId,
      customerName: name,
      phone,
      email,
      deliveryAddress: `${address}, ${locality}, Hyderabad - ${pincode} (Landmark: ${landmark})`,
      deliverySlot:
        deliverySlot === 'express'
          ? '2-Hour Express Delivery'
          : deliverySlot === 'morning'
          ? 'Tomorrow Morning (7:00 AM - 9:00 AM)'
          : deliverySlot === 'afternoon'
          ? 'Tomorrow Afternoon (1:00 PM - 3:00 PM)'
          : 'Tomorrow Evening (6:00 PM - 8:00 PM)',
      paymentMethod:
        paymentMethod === 'cod'
          ? 'Cash on Delivery'
          : paymentMethod === 'upi'
          ? 'BHIM UPI / GPay'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : 'Net Banking',
      items: cart,
      totalPaid: finalTotal,
      orderDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    sessionStorage.setItem('freshkart_last_order', JSON.stringify(orderDetails));
    clearCart();
    router.push('/order-success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="border-b border-neutral-200 pb-4">
        <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Checkout Order</h1>
        <p className="text-xs text-neutral-500 mt-1">Complete your delivery address and payment method to place your order.</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Customer Details, Address, Slot & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Customer Details */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="text-base font-extrabold text-neutral-900">Customer Contact Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Mobile Number (for Delivery SMS) *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Email Address (for Digital Invoice)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rajesh@gmail.com"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="text-base font-extrabold text-neutral-900">Hyderabad Delivery Address</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Flat / House / Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat 402, Sai Apartments, Plot 42"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Locality / Supermarket Zone
                </label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="Madhapur / Gachibowli"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="500081"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Near Metro Pillar or Cyber Towers"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Slot Selector */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="text-base font-extrabold text-neutral-900">Select Delivery Time Slot</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setDeliverySlot('express')}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                  deliverySlot === 'express'
                    ? 'border-black bg-neutral-900 text-white font-bold shadow-md'
                    : 'border-neutral-200 bg-white text-neutral-800'
                }`}
              >
                <div>
                  <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">
                    FASTEST
                  </span>
                  <p className="font-bold text-sm mt-1">⚡ 2-Hour Express Delivery</p>
                  <p className={`text-[10px] ${deliverySlot === 'express' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Order packed immediately from nearest store
                  </p>
                </div>
                {deliverySlot === 'express' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={() => setDeliverySlot('morning')}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                  deliverySlot === 'morning'
                    ? 'border-black bg-neutral-900 text-white font-bold shadow-md'
                    : 'border-neutral-200 bg-white text-neutral-800'
                }`}
              >
                <div>
                  <p className="font-bold text-sm">🌅 Morning Slot</p>
                  <p className={`text-[10px] ${deliverySlot === 'morning' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Tomorrow (7:00 AM - 9:00 AM)
                  </p>
                </div>
                {deliverySlot === 'morning' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={() => setDeliverySlot('afternoon')}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                  deliverySlot === 'afternoon'
                    ? 'border-black bg-neutral-900 text-white font-bold shadow-md'
                    : 'border-neutral-200 bg-white text-neutral-800'
                }`}
              >
                <div>
                  <p className="font-bold text-sm">☀️ Afternoon Slot</p>
                  <p className={`text-[10px] ${deliverySlot === 'afternoon' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Tomorrow (1:00 PM - 3:00 PM)
                  </p>
                </div>
                {deliverySlot === 'afternoon' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={() => setDeliverySlot('evening')}
                className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                  deliverySlot === 'evening'
                    ? 'border-black bg-neutral-900 text-white font-bold shadow-md'
                    : 'border-neutral-200 bg-white text-neutral-800'
                }`}
              >
                <div>
                  <p className="font-bold text-sm">🌙 Evening Slot</p>
                  <p className={`text-[10px] ${deliverySlot === 'evening' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    Tomorrow (6:00 PM - 8:00 PM)
                  </p>
                </div>
                {deliverySlot === 'evening' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Section 4: Payment Methods */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h3 className="text-base font-extrabold text-neutral-900">Select Payment Method</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-center transition ${
                  paymentMethod === 'upi' ? 'border-black bg-black text-white font-bold shadow-md' : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                <Smartphone className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <span>UPI / GPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-center transition ${
                  paymentMethod === 'cod' ? 'border-black bg-black text-white font-bold shadow-md' : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                <Banknote className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <span>Cash on Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition ${
                  paymentMethod === 'card' ? 'border-black bg-black text-white font-bold shadow-md' : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <span>Credit / Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-2xl border text-center transition ${
                  paymentMethod === 'netbanking' ? 'border-black bg-black text-white font-bold shadow-md' : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <span>Net Banking</span>
              </button>
            </div>

            {/* Payment Sub-Forms */}
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-xs">
              {paymentMethod === 'upi' && (
                <div className="space-y-3">
                  <p className="font-bold text-neutral-900">Enter VPA / UPI ID (Google Pay, PhonePe, Paytm)</p>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. mobileNumber@upi or name@okaxis"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <span className="text-[10px] text-neutral-500 font-medium">⚡ Instant 0% transaction fee via BHIM UPI</span>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="space-y-2">
                  <p className="font-bold text-neutral-900">Cash / QR Code on Delivery</p>
                  <p className="text-neutral-600 text-xs">Pay using Cash or Scan UPI QR code at your doorstep when the delivery partner arrives.</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <p className="font-bold text-neutral-900">Card Details</p>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number (e.g. 4532 **** **** 8910)"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="bg-white border border-neutral-300 rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="CVV"
                      className="bg-white border border-neutral-300 rounded-xl px-4 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-2">
                  <p className="font-bold text-neutral-900">Popular Indian Banks</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((b) => (
                      <span key={b} className="p-2.5 bg-white border border-neutral-200 rounded-xl font-bold text-center text-[11px] text-neutral-800">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Submit Button */}
        <div className="lg:col-span-1 space-y-4">
          <OrderSummary showCheckoutButton={false} />

          <button
            type="submit"
            className="w-full py-4 bg-black hover:bg-neutral-800 text-white font-black rounded-2xl text-base transition flex items-center justify-center gap-2 shadow-2xl"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Place Supermarket Order (₹{finalTotal})</span>
          </button>
        </div>
      </form>
    </div>
  );
}
