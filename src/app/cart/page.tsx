'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { CartItemRow } from '../../components/CartItemRow';
import { OrderSummary } from '../../components/OrderSummary';
import { ShoppingBag, ArrowLeft, Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, totalItems, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Your Supermarket Basket</h1>
          <p className="text-xs text-neutral-500 mt-1">Review your daily essentials before proceed to checkout.</p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition"
          >
            <Trash2 className="w-4 h-4" />
            <span>Empty Cart</span>
          </button>
        )}
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Item List */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs font-bold text-neutral-400 uppercase tracking-wider">
              <span>Selected Products ({totalItems})</span>
              <span>Subtotal</span>
            </div>

            <div className="divide-y divide-neutral-100">
              {cart.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold text-neutral-700 hover:text-black transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Supermarket Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary showCheckoutButton={true} />
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="max-w-md mx-auto my-12 text-center bg-neutral-50 rounded-3xl p-10 border border-neutral-200 shadow-sm space-y-4">
          <div className="w-20 h-20 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">Your Basket is Empty</h2>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Looks like you haven&apos;t added any daily groceries or supermarket items yet.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-white font-black rounded-2xl text-xs hover:bg-neutral-800 transition shadow-lg"
            >
              <span>Explore Supermarket Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
