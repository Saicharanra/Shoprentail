'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const DealsSection: React.FC<{ products: Product[] }> = ({ products }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter((p) => p.isTodayDeal || p.discount >= 20).slice(0, 4);

  return (
    <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-6 md:p-8 my-10 border border-emerald-700/50 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-emerald-800/80 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-inner">
            <Flame className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Today&apos;s Super Deals</h2>
              <span className="bg-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                HOT RATION
              </span>
            </div>
            <p className="text-xs text-emerald-200">Exclusive discounts on daily supermarket essentials. Stock limited.</p>
          </div>
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-3 bg-emerald-900/90 px-4 py-2.5 rounded-2xl border border-emerald-700 shadow-md">
          <Clock className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="text-xs font-bold text-emerald-200">Deals Expire In:</span>
          <div className="flex items-center gap-1 text-sm font-black font-mono text-emerald-950">
            <span className="bg-amber-400 px-2 py-1 rounded-lg">{String(timeLeft.hours).padStart(2, '0')}h</span>
            <span className="text-amber-300 font-bold">:</span>
            <span className="bg-amber-400 px-2 py-1 rounded-lg">{String(timeLeft.minutes).padStart(2, '0')}m</span>
            <span className="text-amber-300 font-bold">:</span>
            <span className="bg-amber-400 px-2 py-1 rounded-lg">{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
        </div>
      </div>

      {/* Grid of Deal Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {dealProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-8 text-center pt-4 border-t border-emerald-800/80">
        <Link
          href="/offers"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-2xl text-xs transition shadow-xl border border-amber-300"
        >
          <span>Explore All 25+ Today&apos;s Supermarket Deals</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
