'use client';

import React, { useState } from 'react';
import { ToastProvider } from '../context/ToastContext';
import { CartProvider, useCart } from '../context/CartContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomNavigation } from './MobileBottomNavigation';
import { LocationModal } from './LocationModal';
import { AuthModal } from './AuthModal';
import { QuickViewModal } from './QuickViewModal';

const InnerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const { isAuthModalOpen, setAuthModalOpen } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-black selection:text-white">
      <Navbar
        onOpenLocationModal={() => setLocationModalOpen(true)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      <MobileBottomNavigation
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <QuickViewModal />
    </div>
  );
};

export const ClientLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastProvider>
      <CartProvider>
        <InnerLayout>{children}</InnerLayout>
      </CartProvider>
    </ToastProvider>
  );
};
