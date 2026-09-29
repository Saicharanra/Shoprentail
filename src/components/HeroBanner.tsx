'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Percent, ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    tag: 'HYDERABAD RATION SAVINGS',
    headline: 'Everything You Need, At Everyday Low Prices',
    subtitle: 'Get up to 30% OFF on Aashirvaad Atta, Fortune Oils, Fresh Milk & Organic Fruits.',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
    secondaryCta: 'View Mega Offers',
    secondaryLink: '/offers',
    badgeText: '2-Hour Local Delivery',
    bgGradient: 'bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 text-white',
    badgeBg: 'bg-amber-400 text-emerald-950 font-black',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    tag: 'FARM FRESH DIRECT',
    headline: '100% Organic Fruits & Fresh Vegetables',
    subtitle: 'Directly sourced from regional farms with zero chemical calcium carbide treatment.',
    ctaText: 'Explore Fresh Produce',
    ctaLink: '/shop?category=fruits-vegetables',
    secondaryCta: 'Locate Nearest Store',
    secondaryLink: '/stores',
    badgeText: 'Daily Morning Harvest',
    bgGradient: 'bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white',
    badgeBg: 'bg-emerald-300 text-emerald-950 font-black',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    tag: 'WEEKEND GROCERY BASH',
    headline: 'Buy 1 Get 1 & Combo Pack Mega Deals',
    subtitle: 'Save big on snacks, biscuits, beverages, detergents, and household cleaning essentials.',
    ctaText: 'Claim Weekend Deals',
    ctaLink: '/offers',
    secondaryCta: 'Browse Snacks',
    secondaryLink: '/shop?category=snacks',
    badgeText: 'Limited Stock Offers',
    bgGradient: 'bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 text-white',
    badgeBg: 'bg-rose-500 text-white font-black',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80'
  }
];

export const HeroBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = BANNERS[currentIndex];

  return (
    <section className="relative overflow-hidden rounded-3xl my-4 mx-4 md:mx-auto max-w-7xl shadow-xl border border-emerald-500/30">
      <div className={`relative min-h-[380px] md:min-h-[420px] flex items-center ${current.bgGradient} transition-all duration-700`}>
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={current.image}
            alt={current.headline}
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl p-6 md:p-12 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${current.badgeBg} shadow-md`}>
              <Zap className="w-3.5 h-3.5 fill-current" />
              {current.tag}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold text-amber-300 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              {current.badgeText}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
            {current.headline}
          </h1>

          <p className="text-sm md:text-base text-emerald-100 font-medium leading-relaxed max-w-xl">
            {current.subtitle}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link
              href={current.ctaLink}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-2xl text-sm transition shadow-xl flex items-center gap-2 group border border-amber-300"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={current.secondaryLink}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl text-sm border border-white/30 transition shadow-md"
            >
              {current.secondaryCta}
            </Link>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
            className="p-2.5 bg-black/40 hover:bg-black/70 text-amber-300 rounded-full border border-white/20 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5 px-2">
            {BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-7 bg-amber-400' : 'w-2.5 bg-white/40'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % BANNERS.length)}
            className="p-2.5 bg-black/40 hover:bg-black/70 text-amber-300 rounded-full border border-white/20 transition"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
