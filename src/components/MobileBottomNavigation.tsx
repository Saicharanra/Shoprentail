'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Percent, ShoppingBag, Store, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MobileBottomNavProps {
  onOpenAuthModal: () => void;
}

export const MobileBottomNavigation: React.FC<MobileBottomNavProps> = ({ onOpenAuthModal }) => {
  const pathname = usePathname();
  const { totalItems, user } = useCart();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Shop', href: '/shop', icon: Grid },
    { label: 'Offers', href: '/offers', icon: Percent },
    { label: 'Stores', href: '/stores', icon: Store },
    { label: 'Cart', href: '/cart', icon: ShoppingBag, badge: totalItems }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 px-2 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition ${
              isActive ? 'text-black font-bold' : 'text-neutral-500 hover:text-black font-medium'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-neutral-500'}`} />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
