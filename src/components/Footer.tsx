'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Truck, 
  Clock, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Share2,
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-white pt-16 pb-24 md:pb-12 border-t-4 border-amber-400">
      {/* Supermarket Benefits Banner */}
      <div className="max-w-7xl mx-auto px-4 pb-12 mb-12 border-b border-emerald-900 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-900 border border-emerald-800 flex items-center justify-center text-amber-300 shrink-0 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Everyday Low Prices</h4>
            <p className="text-xs text-emerald-200 mt-0.5">Guaranteed maximum savings below MRP</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-900 border border-emerald-800 flex items-center justify-center text-amber-300 shrink-0 shadow-md">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Fast Local Delivery</h4>
            <p className="text-xs text-emerald-200 mt-0.5">2-Hour Express slots across Hyderabad</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-900 border border-emerald-800 flex items-center justify-center text-amber-300 shrink-0 shadow-md">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Farm Fresh Promise</h4>
            <p className="text-xs text-emerald-200 mt-0.5">Harvested daily from regional farmers</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-900 border border-emerald-800 flex items-center justify-center text-amber-300 shrink-0 shadow-md">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Easy Payment Options</h4>
            <p className="text-xs text-emerald-200 mt-0.5">UPI, Cash on Delivery, Cards & Wallets</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center text-xl shadow-md">
              FK
            </div>
            <span className="font-black text-2xl tracking-tight text-white">FreshKart</span>
          </div>
          <p className="text-xs text-emerald-200 leading-relaxed max-w-sm">
            FreshKart is India&apos;s trusted neighborhood retail brand dedicated to delivering daily essential groceries, fresh fruits & vegetables, and household goods at honest everyday low prices.
          </p>
          
          <div className="space-y-2 pt-2 text-xs text-emerald-100">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
              <span>HQ: Plot 42, Mindspace Junction, Hitec City, Hyderabad 500081</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Customer Helpline: +91 40 2311 8899 / 1800-FRESH-KART</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-300 shrink-0" />
              <span>support@freshkart.in</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 mb-4">Supermarket Aisles</h4>
          <ul className="space-y-2.5 text-xs text-emerald-100 font-medium">
            <li><Link href="/shop?category=groceries" className="hover:text-amber-300 transition">Groceries & Staples</Link></li>
            <li><Link href="/shop?category=fruits-vegetables" className="hover:text-amber-300 transition">Fruits & Vegetables</Link></li>
            <li><Link href="/shop?category=dairy-bakery" className="hover:text-amber-300 transition">Dairy & Bakery</Link></li>
            <li><Link href="/shop?category=beverages" className="hover:text-amber-300 transition">Beverages & Juices</Link></li>
            <li><Link href="/shop?category=snacks" className="hover:text-amber-300 transition">Snacks & Munchies</Link></li>
            <li><Link href="/shop?category=personal-care" className="hover:text-amber-300 transition">Personal Care</Link></li>
            <li><Link href="/shop?category=home-care" className="hover:text-amber-300 transition">Home Care & Hygiene</Link></li>
            <li><Link href="/shop?category=household" className="hover:text-amber-300 transition">Household & Kitchen</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-xs text-emerald-100 font-medium">
            <li><Link href="/about" className="hover:text-amber-300 transition">About FreshKart</Link></li>
            <li><Link href="/stores" className="hover:text-amber-300 transition">Hyderabad Stores Locator</Link></li>
            <li><Link href="/offers" className="hover:text-amber-300 transition">Weekly Super Deals</Link></li>
            <li><Link href="/cart" className="hover:text-amber-300 transition">My Shopping Cart</Link></li>
            <li><Link href="/shop" className="hover:text-amber-300 transition">Browse All Products</Link></li>
            <li><span className="text-emerald-400/60 cursor-not-allowed">Terms & Conditions</span></li>
            <li><span className="text-emerald-400/60 cursor-not-allowed">Privacy Policy</span></li>
            <li><span className="text-emerald-400/60 cursor-not-allowed">Refund Policy</span></li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 mb-4">Stay Updated</h4>
          <p className="text-xs text-emerald-200 mb-3">
            Subscribe to get weekly Hyderabad deal alerts and exclusive ₹100 discount coupons.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-emerald-900 border border-emerald-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-emerald-300 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Subscribe Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Social Badges */}
          <div className="flex items-center gap-3 mt-6">
            <span className="px-3 py-1.5 bg-emerald-900 border border-emerald-800 rounded-xl text-xs text-emerald-100 font-bold hover:text-amber-300 hover:border-amber-400 transition cursor-pointer flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>Hyderabad</span>
            </span>
            <span className="px-3 py-1.5 bg-emerald-900 border border-emerald-800 rounded-xl text-xs text-emerald-100 font-bold hover:text-amber-300 hover:border-amber-400 transition cursor-pointer flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Share App</span>
            </span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-emerald-900 flex flex-col md:flex-row items-center justify-between text-xs text-emerald-300 gap-4">
        <p>© {new Date().getFullYear()} FreshKart India Retail Ltd. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Accepted Payments:</span>
          <span className="font-extrabold text-amber-300">BHIM UPI • Google Pay • PhonePe • Cards • COD</span>
        </p>
      </div>
    </footer>
  );
};
