'use client';

import React from 'react';
import { Offer } from '../types';
import Link from 'next/link';
import { Tag, Clock, ArrowRight, Copy } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const OfferBanner: React.FC<{ offer: Offer }> = ({ offer }) => {
  const { showToast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offer.code);
    showToast(`Coupon code ${offer.code} copied!`, 'success');
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-r ${offer.bgGradient} text-white shadow-xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6`}>
      <div className="relative z-10 max-w-lg space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            {offer.discountText}
          </span>
          <span className="text-xs text-neutral-400 font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {offer.validUntil}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight text-white">
          {offer.title}
        </h3>
        <p className="text-xs md:text-sm text-neutral-300 font-medium">
          {offer.subtitle} {offer.minOrder ? `(Min Order ₹${offer.minOrder})` : ''}
        </p>

        <div className="pt-3 flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-mono font-bold transition"
            title="Copy promo code"
          >
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>CODE: {offer.code}</span>
            <Copy className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          <Link
            href={`/shop?category=${offer.category}`}
            className="px-5 py-2.5 bg-white text-black hover:bg-neutral-200 font-extrabold rounded-xl text-xs transition flex items-center gap-1.5 shadow-lg"
          >
            <span>Claim Offer Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="relative z-10 w-full md:w-56 h-40 rounded-2xl overflow-hidden shrink-0 border border-white/10">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    </div>
  );
};
