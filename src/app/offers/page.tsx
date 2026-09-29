'use client';

import React from 'react';
import { OFFERS, PRODUCTS } from '../../data/products';
import { OfferBanner } from '../../components/OfferBanner';
import { ProductGrid } from '../../components/ProductGrid';
import { Flame, Percent, Sparkles, Tag, Gift } from 'lucide-react';

export default function OffersPage() {
  const megaDeals = PRODUCTS.filter((p) => p.discount >= 20);
  const bogoProducts = PRODUCTS.filter((p) => p.isTodayDeal).slice(0, 4);
  const groceryOffers = PRODUCTS.filter((p) => p.category === 'groceries' && p.discount > 0);
  const householdOffers = PRODUCTS.filter((p) => (p.category === 'home-care' || p.category === 'household') && p.discount > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Page Header */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-neutral-800 shadow-2xl">
        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-600 text-white rounded-full text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-white" />
            WEEKEND SAVINGS FIESTA
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            FreshKart Supermarket Mega Offers
          </h1>
          <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-medium">
            Save big on your monthly grocery ration with exclusive brand cashbacks, Buy 1 Get 1 deals, and combo offers.
          </p>
        </div>
      </div>

      {/* Promotional Banners Grid */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-emerald-600" />
          <h2 className="text-2xl font-black text-neutral-900">Featured Supermarket Coupons</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OFFERS.map((offer) => (
            <OfferBanner key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      {/* Mega Deals (20%+ Discount) */}
      <section>
        <ProductGrid
          products={megaDeals}
          title="🔥 Mega Deals (Flat 20%+ OFF)"
          subtitle="Highest discount products across all supermarket categories."
        />
      </section>

      {/* Buy 1 Get 1 / Combo Offers */}
      <section className="bg-neutral-50 rounded-3xl p-6 md:p-8 border border-neutral-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center font-bold">
            <Gift className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-neutral-900">Buy 1 Get 1 & Special Combos</h2>
            <p className="text-xs text-neutral-500">Super saver family pack bundles for snacks, tea & breakfast.</p>
          </div>
        </div>

        <ProductGrid products={bogoProducts} />
      </section>

      {/* Category Specific Offers */}
      <section className="space-y-12">
        <ProductGrid
          products={groceryOffers}
          title="Grocery & Staples Savings"
          subtitle="Atta, Rice, Pulses, Ghee & Cooking Oils on discount."
        />

        <ProductGrid
          products={householdOffers}
          title="Household & Cleaning Offers"
          subtitle="Detergents, floor cleaners, dishwash gels & paper products."
        />
      </section>
    </div>
  );
}
