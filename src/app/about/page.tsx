'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Store, 
  Truck, 
  Heart, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Header */}
      <div className="bg-black text-white rounded-3xl p-8 md:p-16 relative overflow-hidden border border-neutral-800 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-black uppercase tracking-wider text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          OUR STORY & PROMISE
        </div>
        <h1 className="text-3xl md:text-6xl font-black tracking-tight max-w-3xl mx-auto">
          Everyday Essentials. Better Prices.
        </h1>
        <p className="text-sm md:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-medium">
          FreshKart was founded with a simple mission: to give every Indian family access to farm-fresh groceries, genuine brands, and daily staples at honest supermarket prices.
        </p>
      </div>

      {/* Story & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">Built for Indian Homes</span>
          <h2 className="text-3xl font-black text-neutral-900 leading-tight">
            Redefining Neighborhood Supermarket Shopping in India
          </h2>
          <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
            Started in Hyderabad, FreshKart bridges local farm cooperatives and trusted FMCG brands directly with consumers. By eliminating unnecessary middlemen and optimizing local store logistics, we pass maximum savings back to families.
          </p>
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-3 text-xs font-bold text-neutral-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Direct farmer partnerships for pesticide-checked produce</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-neutral-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Strict 4-step quality assurance on wheat atta, rice & pulses</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-neutral-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>2-Hour doorstep delivery across 6+ Hyderabad regions</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200 space-y-6">
          <h3 className="text-xl font-black text-neutral-900">The FreshKart Core Values</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold shrink-0">
                1
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Honest Pricing</h4>
                <p className="text-xs text-neutral-500 mt-0.5">We promise maximum discounts below MRP on daily ration essentials.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold shrink-0">
                2
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Farm Freshness</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Daily early morning harvests delivered without chemical preservatives.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold shrink-0">
                3
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Customer First</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Hassle-free doorstep returns and instant customer support resolution.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Numbers */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-neutral-800">
        <div>
          <p className="text-3xl md:text-4xl font-black text-emerald-400">50,000+</p>
          <p className="text-xs text-neutral-400 font-medium mt-1">Happy Hyderabad Families</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-black text-emerald-400">6+</p>
          <p className="text-xs text-neutral-400 font-medium mt-1">Physical Superstores</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-black text-emerald-400">500+</p>
          <p className="text-xs text-neutral-400 font-medium mt-1">FMCG Brand Partners</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-black text-emerald-400">99.4%</p>
          <p className="text-xs text-neutral-400 font-medium mt-1">On-Time Delivery Rate</p>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center space-y-4 pt-6">
        <h2 className="text-2xl font-black">Ready to Experience Better Supermarket Shopping?</h2>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-black text-sm rounded-2xl hover:bg-neutral-800 transition shadow-xl"
        >
          <span>Shop FreshKart Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
