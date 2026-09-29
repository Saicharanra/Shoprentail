'use client';

import React, { useState } from 'react';
import { X, Smartphone, Mail, Lock, User as UserIcon, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useCart();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('500081');
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [otp, setOtp] = useState(['', '', '', '']);

  if (!isOpen) return null;

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
    setStep('details');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-black transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Banner Header */}
        <div className="text-center mb-6 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Everyday Essentials. Better Prices.
          </div>
          <h2 className="text-2xl font-black text-neutral-900">
            {tab === 'login' ? 'Welcome to FreshKart' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Log in to save items, track local delivery, and unlock member deals.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-neutral-100 p-1 rounded-2xl mb-6">
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
            New Account
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
              className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Continue with OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5 animate-fade-in">
            <div className="text-center">
              <p className="text-sm font-semibold text-neutral-800">Enter 4-Digit OTP sent to</p>
              <p className="text-sm font-bold text-black">{phoneOrEmail}</p>
              <span className="text-xs text-emerald-600 font-medium">Auto-fill test code: 1 2 3 4</span>
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
                    if (val && e.target.nextElementSibling) {
                      (e.target.nextElementSibling as HTMLInputElement).focus();
                    }
                  }}
                  className="w-12 h-12 text-center text-xl font-bold bg-neutral-100 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-black focus:outline-none"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black hover:bg-neutral-800 text-white rounded-xl font-bold text-sm transition shadow-lg"
            >
              Verify & Sign In
            </button>
            <button
              type="button"
              onClick={() => setStep('details')}
              className="w-full text-center text-xs text-neutral-500 hover:text-black font-semibold"
            >
              Change phone/email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
