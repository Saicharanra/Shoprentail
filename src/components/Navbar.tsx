'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  MapPin, 
  Menu, 
  X, 
  Percent, 
  Store, 
  ChevronDown, 
  Zap,
  Sparkles,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SearchBar } from './SearchBar';
import { CATEGORIES } from '../data/products';

interface NavbarProps {
  onOpenLocationModal: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLocationModal,
  onOpenAuthModal
}) => {
  const pathname = usePathname();
  const { totalItems, subtotal, wishlist, location, user, logout } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-emerald-100 shadow-sm">
      {/* Top Banner Announcement - Bright Clean Green Bar */}
      <div className="bg-emerald-700 text-white text-xs py-2 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-amber-400 text-emerald-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-sm">
              HYDERABAD EXPRESS
            </span>
            <span className="truncate">⚡ 2-Hour Supermarket Delivery • Use Code <strong className="bg-amber-400 text-black px-1.5 py-0.5 rounded font-black">FRESH100</strong> for ₹100 OFF</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-emerald-100 text-xs font-semibold">
            <Link href="/stores" className="hover:text-amber-300 flex items-center gap-1 transition">
              <Store className="w-3.5 h-3.5 text-amber-300" />
              <span>6+ Hyderabad Stores</span>
            </Link>
            <Link href="/about" className="hover:text-amber-300 transition">
              About Us
            </Link>
            <span>Customer Care: 1800-FRESH-KART</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-emerald-50 rounded-xl text-emerald-900 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-2xl shadow-md group-hover:bg-emerald-700 transition">
              FK
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tight text-neutral-900">FreshKart</span>
                <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-1.5 py-0.2 rounded uppercase shadow-sm">Supermarket</span>
              </div>
              <p className="text-[10px] text-emerald-700 font-extrabold tracking-tight hidden sm:block">
                Everyday Essentials. Better Prices.
              </p>
            </div>
          </Link>
        </div>

        {/* Location Selector Pill */}
        <button
          onClick={onOpenLocationModal}
          className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-2xl text-left transition shrink-0"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
            <MapPin className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1 text-[10px] uppercase font-black text-emerald-800">
              <span>Delivering to</span>
              <ChevronDown className="w-3 h-3 text-emerald-600" />
            </div>
            <p className="text-xs font-black text-neutral-900 truncate max-w-[130px]">
              {location.locality} ({location.pincode})
            </p>
          </div>
        </button>

        {/* Search Bar Component */}
        <div className="hidden md:block flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist */}
          <Link
            href="/shop?wishlist=true"
            className="relative p-2.5 hover:bg-rose-50 rounded-2xl text-neutral-800 transition hidden sm:flex items-center justify-center border border-transparent hover:border-rose-200"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 text-rose-600" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* User Profile / Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-2xl transition border border-emerald-200"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-black flex items-center justify-center text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-black text-neutral-900 hidden lg:inline max-w-[100px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-emerald-100 py-2 z-50 animate-slide-up">
                  <div className="px-4 py-2 border-b border-emerald-50 bg-emerald-50/50">
                    <p className="text-xs font-black text-neutral-900">{user.name}</p>
                    <p className="text-[11px] text-emerald-700 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/cart"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-emerald-50"
                  >
                    My Cart ({totalItems} items)
                  </Link>
                  <Link
                    href="/stores"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-emerald-50"
                  >
                    Nearby Stores
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 border-t border-neutral-100 mt-1"
                  >
                    Logout Account
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-3.5 py-2 hover:bg-emerald-50 rounded-2xl transition text-xs font-black text-emerald-950 border border-emerald-200"
            >
              <UserIcon className="w-4 h-4 text-emerald-700" />
              <span>Login</span>
            </button>
          )}

          {/* Cart Button */}
          <Link
            href="/cart"
            className="flex items-center gap-2.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition shadow-md hover:shadow-lg"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-emerald-950 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce shadow">
                  {totalItems}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-[10px] font-bold text-emerald-100 uppercase">My Basket</p>
              <p className="text-xs font-black text-amber-300">₹{subtotal}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="md:hidden px-4 pb-3 pt-1">
        <SearchBar />
      </div>

      {/* Categories Horizontal Sub-Navbar */}
      <nav className="border-t border-emerald-800 bg-emerald-900 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-6 overflow-x-auto no-scrollbar py-2 text-xs font-bold">
          <div className="flex items-center gap-1.5 shrink-0">
            <Link
              href="/shop"
              className={`px-3 py-1.5 rounded-xl transition ${
                pathname === '/shop' ? 'bg-white text-emerald-900 font-black' : 'hover:bg-emerald-800 text-emerald-100'
              }`}
            >
              All Products
            </Link>
            <Link
              href="/offers"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition text-emerald-950 bg-amber-400 hover:bg-amber-300 font-black shadow-sm ${
                pathname === '/offers' ? 'ring-2 ring-white' : ''
              }`}
            >
              <Percent className="w-3.5 h-3.5 fill-emerald-950" />
              <span>Mega Supermarket Deals</span>
            </Link>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="px-3 py-1.5 rounded-xl hover:bg-emerald-800 text-emerald-100 hover:text-white whitespace-nowrap transition font-semibold"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0 text-amber-300 font-bold">
            <Link href="/stores" className="hover:text-white flex items-center gap-1">
              <Store className="w-3.5 h-3.5" />
              <span>Store Locations</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-xs bg-white h-full p-5 overflow-y-auto flex flex-col justify-between shadow-2xl animate-slide-up">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-emerald-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-base">
                    FK
                  </div>
                  <span className="font-black text-lg text-neutral-900">FreshKart</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-emerald-50 rounded-lg text-neutral-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Location button inside drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLocationModal();
                }}
                className="w-full flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl text-left mb-4 border border-emerald-200"
              >
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-emerald-800">Delivering to</p>
                  <p className="text-xs font-black text-neutral-900">{location.locality} ({location.pincode})</p>
                </div>
              </button>

              <div className="space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl font-bold text-sm text-neutral-800 hover:bg-emerald-50"
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl font-bold text-sm text-neutral-800 hover:bg-emerald-50"
                >
                  Shop All Categories
                </Link>
                <Link
                  href="/offers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl font-black text-sm text-emerald-950 bg-amber-400"
                >
                  🔥 Mega Deals & Offers
                </Link>
                <Link
                  href="/stores"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl font-bold text-sm text-neutral-800 hover:bg-emerald-50"
                >
                  Hyderabad Store Locator
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl font-bold text-sm text-neutral-800 hover:bg-emerald-50"
                >
                  About FreshKart
                </Link>
              </div>

              <div className="pt-4 border-t border-emerald-100 mt-4">
                <p className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-2">Categories</p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-rose-50 text-rose-600 font-bold text-xs rounded-xl"
                >
                  Logout ({user.name})
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
