'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Tag, Check, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface OrderSummaryProps {
  showCheckoutButton?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ showCheckoutButton = true }) => {
  const {
    totalItems,
    mrpTotal,
    subtotal,
    totalDiscount,
    deliveryCharge,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim());
      setCouponCode('');
    }
  };

  const freeDeliveryThreshold = 499;
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-5">
      <h3 className="text-lg font-black text-emerald-950 pb-3 border-b border-emerald-50">
        Bill Summary ({totalItems} Items)
      </h3>

      {/* Free Delivery Bar */}
      {subtotal > 0 && (
        <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-100">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="flex items-center gap-1.5 text-emerald-950">
              <Truck className="w-4 h-4 text-emerald-700" />
              {amountNeededForFreeDelivery === 0 ? (
                <span className="text-emerald-700 font-black">FREE Express Delivery Unlocked!</span>
              ) : (
                <span>Add ₹{amountNeededForFreeDelivery} for FREE Delivery</span>
              )}
            </span>
            <span className="text-[10px] text-emerald-800 font-mono font-bold">{Math.round(freeDeliveryProgress)}%</span>
          </div>
          <div className="w-full h-2 bg-emerald-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Coupon Code Section */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-emerald-800 mb-2">
          Apply Supermarket Promo Code
        </label>
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2 text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-700" />
              <span className="font-bold text-emerald-900">{appliedCoupon.code} Applied</span>
            </div>
            <button
              onClick={removeCoupon}
              className="text-xs font-bold text-rose-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleCouponSubmit} className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="e.g. FRESH100"
              className="flex-1 bg-emerald-50/50 border border-emerald-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600 uppercase text-emerald-950"
            />
            <button
              type="submit"
              disabled={!couponCode.trim()}
              className="px-4 py-2 bg-emerald-700 disabled:bg-neutral-300 text-white rounded-xl text-xs font-black hover:bg-emerald-800 transition shadow-sm"
            >
              Apply
            </button>
          </form>
        )}
      </div>

      {/* Price Calculations Breakdown */}
      <div className="space-y-2.5 pt-3 border-t border-emerald-50 text-xs">
        <div className="flex justify-between text-neutral-600 font-medium">
          <span>Item Total (MRP)</span>
          <span>₹{mrpTotal}</span>
        </div>

        <div className="flex justify-between text-emerald-700 font-bold">
          <span>Product Discount Savings</span>
          <span>- ₹{mrpTotal - subtotal}</span>
        </div>

        {appliedCoupon && (
          <div className="flex justify-between text-emerald-700 font-bold">
            <span>Coupon Savings ({appliedCoupon.code})</span>
            <span>- ₹{appliedCoupon.discountAmount}</span>
          </div>
        )}

        <div className="flex justify-between text-neutral-600 font-medium">
          <span>Delivery Charge</span>
          {deliveryCharge === 0 ? (
            <span className="text-emerald-700 font-black">FREE</span>
          ) : (
            <span>₹{deliveryCharge}</span>
          )}
        </div>

        <div className="pt-3 border-t border-emerald-100 flex justify-between items-baseline">
          <div>
            <span className="text-base font-black text-emerald-950">Total Payable</span>
            <p className="text-[10px] text-neutral-400 font-medium">Includes all taxes & delivery fees</p>
          </div>
          <span className="text-2xl font-black text-emerald-950">₹{finalTotal}</span>
        </div>
      </div>

      {/* Total Savings Highlight Pill */}
      {totalDiscount > 0 && (
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-3 rounded-2xl text-center text-xs font-bold shadow-md">
          🎉 Total Savings on this Order: <span className="text-amber-300 font-black">₹{totalDiscount}</span>
        </div>
      )}

      {showCheckoutButton && (
        <div className="pt-2">
          <Link
            href="/checkout"
            className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-2xl text-sm transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border border-emerald-600"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </Link>
        </div>
      )}
    </div>
  );
};
