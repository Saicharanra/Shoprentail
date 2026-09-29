'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { ShieldCheck, Smartphone, User as UserIcon, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useCart();

  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('500081');
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [otp, setOtp] = useState(['1', '2', '3', '4']);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneOrEmail.trim()) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: name || (phoneOrEmail.includes('@') ? phoneOrEmail.split('@')[0] : 'FreshKart Customer'),
      email: phoneOrEmail.includes('@') ? phoneOrEmail : 'customer@freshkart.in',
      phone: !phoneOrEmail.includes('@') ? phoneOrEmail : '+91 98765 43210',
      pincode: pincode || '500081'
    });
    router.push('/shop');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-xl space-y-6 relative overflow-hidden">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-black text-white font-black text-xl flex items-center justify-center mx-auto mb-2">
            FK
          </div>
          <h1 className="text-2xl font-black text-neutral-900">
            {tab === 'login' ? 'Sign In to FreshKart' : 'Create FreshKart Account'}
          </h1>
          <p className="text-xs text-neutral-500">
            Everyday Essentials. Better Prices.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-neutral-100 p-1 rounded-2xl">
          <button
            onClick={() => {
              setTab('login');
              setStep('details');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              tab === 'login' ? 'bg-black text-white shadow-md' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setTab('register');
              setStep('details');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              tab === 'register' ? 'bg-black text-white shadow-md' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Register
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Mobile Number or Email
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  required
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="e.g. 9876543210 or name@gmail.com"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {tab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Hyderabad Pincode
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="500081"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Continue with OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-neutral-800">Enter 4-Digit Security Code</p>
              <p className="text-xs text-emerald-600 font-bold">Auto-filled: 1 2 3 4</p>
            </div>

            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => {
                    const val = e.target.value;
                    const newOtp = [...otp];
                    newOtp[index] = val;
                    setOtp(newOtp);
                  }}
                  className="w-12 h-12 text-center text-xl font-bold bg-neutral-100 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-sm transition shadow-lg"
            >
              Verify & Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
