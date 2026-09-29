'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, User } from '../types';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  location: { locality: string; pincode: string };
  setLocation: (loc: { locality: string; pincode: string }) => void;

  appliedCoupon: { code: string; discountAmount: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Cart summary metrics
  totalItems: number;
  mrpTotal: number;
  subtotal: number;
  totalDiscount: number;
  deliveryCharge: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_DELIVERY_THRESHOLD = 499;
const STANDARD_DELIVERY_FEE = 49;

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [location, setLocationState] = useState({ locality: 'Madhapur', pincode: '500081' });
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('freshkart_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('freshkart_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedLocation = localStorage.getItem('freshkart_location');
      if (savedLocation) setLocationState(JSON.parse(savedLocation));

      const savedUser = localStorage.getItem('freshkart_user');
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (e) {
      console.error('Error loading saved state:', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('freshkart_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed saving cart:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('freshkart_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed saving wishlist:', e);
    }
  }, [wishlist]);

  const setLocation = (loc: { locality: string; pincode: string }) => {
    setLocationState(loc);
    localStorage.setItem('freshkart_location', JSON.stringify(loc));
    showToast(`Delivery location updated to ${loc.locality} (${loc.pincode})`, 'info');
  };

  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          selectedSize: selectedSize || updated[existingIndex].selectedSize
        };
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedSize: selectedSize || product.sizes[0] }];
      }
    });
    showToast(`Added ${product.name} to cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const getItemQuantity = (productId: string): number => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'FRESH100' || cleanCode === 'FRESHGROCERY' || cleanCode === 'WELCOME50') {
      const amount = cleanCode === 'FRESH100' ? 100 : cleanCode === 'WELCOME50' ? 50 : 75;
      setAppliedCoupon({ code: cleanCode, discountAmount: amount });
      showToast(`Coupon ${cleanCode} applied! Saved ₹${amount}`, 'success');
      return true;
    } else {
      showToast('Invalid coupon code. Try FRESH100 or WELCOME50', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('freshkart_user', JSON.stringify(newUser));
    showToast(`Welcome back, ${newUser.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('freshkart_user');
    showToast('Logged out successfully', 'info');
  };

  // Metric Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const mrpTotal = cart.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalDiscount = mrpTotal - subtotal + (appliedCoupon ? appliedCoupon.discountAmount : 0);
  
  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : STANDARD_DELIVERY_FEE;
  const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalTotal = Math.max(0, subtotal - couponDiscount + deliveryCharge);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        toggleWishlist,
        isInWishlist,
        location,
        setLocation,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        user,
        login,
        logout,
        isAuthModalOpen,
        setAuthModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        totalItems,
        mrpTotal,
        subtotal,
        totalDiscount,
        deliveryCharge,
        finalTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
