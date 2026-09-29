'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  PackageCheck, 
  Truck, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const savedOrder = sessionStorage.getItem('freshkart_last_order');
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      } else {
        // Fallback default mock order if accessed directly
        setOrder({
          orderId: 'FK-892410',
          customerName: 'Rajesh Sharma',
          phone: '+91 98765 43210',
          email: 'rajesh@gmail.com',
          deliveryAddress: 'Flat 402, Sai Apartments, Madhapur, Hyderabad - 500081',
          deliverySlot: '2-Hour Express Delivery',
          paymentMethod: 'BHIM UPI',
          items: [],
          totalPaid: 849,
          orderDate: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
    } catch (e) {
      console.error('Failed reading order details:', e);
    }
  }, []);

  if (!order) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Success Badge Banner */}
      <div className="bg-neutral-950 text-white rounded-3xl p-8 md:p-10 border border-neutral-800 text-center shadow-2xl space-y-4 animate-slide-up">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
          <CheckCircle2 className="w-10 h-10 fill-emerald-400 text-black" />
        </div>

        <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
          ORDER CONFIRMED
        </span>

        <h1 className="text-3xl font-black tracking-tight">Thank You For Your Order!</h1>
        <p className="text-xs text-neutral-300">
          Order ID: <strong className="text-white font-mono">{order.orderId}</strong> • Confirmed on {order.orderDate}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-neutral-300">
          <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-emerald-400" /> {order.deliverySlot}</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Doorstep Delivery</span>
        </div>
      </div>

      {/* Order Tracker Timeline */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-neutral-900 pb-3 border-b border-neutral-100">
          Supermarket Express Delivery Tracker
        </h3>

        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mx-auto font-bold">
              ✓
            </div>
            <p className="font-bold text-neutral-900">Order Placed</p>
            <p className="text-[10px] text-neutral-500">Confirmed</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold animate-pulse">
              2
            </div>
            <p className="font-bold text-neutral-900">Packing at Store</p>
            <p className="text-[10px] text-neutral-500">Madhapur Store</p>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center mx-auto font-bold">
              3
            </div>
            <p className="font-bold text-neutral-900">Out for Delivery</p>
            <p className="text-[10px] text-neutral-500">Local Rider</p>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center mx-auto font-bold">
              4
            </div>
            <p className="font-bold text-neutral-900">Delivered</p>
            <p className="text-[10px] text-neutral-500">Within 2 hours</p>
          </div>
        </div>
      </div>

      {/* Order Summary Details Card */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4 text-xs">
        <h3 className="text-base font-extrabold text-neutral-900 pb-3 border-b border-neutral-100">
          Delivery & Payment Breakdown
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">Recipient & Address</span>
            <p className="font-bold text-neutral-900">{order.customerName} ({order.phone})</p>
            <p className="text-neutral-600">{order.deliveryAddress}</p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-1">
            <span className="font-bold text-neutral-400 uppercase tracking-wider text-[10px]">Payment Summary</span>
            <p className="font-bold text-neutral-900">Method: {order.paymentMethod}</p>
            <p className="text-neutral-900 font-black text-sm">Total Paid: ₹{order.totalPaid}</p>
            <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
              Payment Status: Verified
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Link
          href="/shop"
          className="w-full sm:w-auto px-8 py-4 bg-black hover:bg-neutral-800 text-white font-black rounded-2xl text-xs transition text-center flex items-center justify-center gap-2 shadow-lg"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Supermarket Shopping</span>
        </Link>

        <Link
          href="/stores"
          className="w-full sm:w-auto px-6 py-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold rounded-2xl text-xs transition text-center"
        >
          Locate Stores in Hyderabad
        </Link>
      </div>
    </div>
  );
}
