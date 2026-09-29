'use client';

import React from 'react';
import Link from 'next/link';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryCard } from '../components/CategoryCard';
import { DealsSection } from '../components/DealsSection';
import { ProductGrid } from '../components/ProductGrid';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { 
  ShieldCheck, 
  Truck, 
  Clock, 
  CreditCard, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  Award,
  ArrowRight,
  Store,
  CheckCircle2,
  Mail
} from 'lucide-react';

export default function HomePage() {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);
  const weeklyDeals = PRODUCTS.filter((p) => p.discount >= 18).slice(0, 8);
  const popularNearYou = PRODUCTS.slice(8, 16);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <HeroBanner />

      {/* Category Section: Shop by Category */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6 border-b border-emerald-100 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Supermarket Aisle
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-emerald-950 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-xs font-black text-emerald-700 hover:text-emerald-900 transition"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Today's Best Deals Section with Timer */}
      <div className="max-w-7xl mx-auto px-4">
        <DealsSection products={PRODUCTS} />
      </div>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4">
        <ProductGrid
          products={bestSellers}
          title="Best Sellers in Hyderabad"
          subtitle="Top ordered staples, fresh dairy, and daily household essentials."
        />
      </section>

      {/* Mid Banner: Supermarket Savings Highlight - DMart Inspired Rich Green & Gold */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-700 shadow-2xl">
          <div className="space-y-4 max-w-xl z-10">
            <span className="bg-amber-400 text-emerald-950 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow">
              HYDERABAD LOCAL RATION GUARANTEE
            </span>
            <h2 className="text-3xl md:text-4xl font-black leading-tight text-white drop-shadow">
              Save Up to ₹3,000 Monthly On Your Supermarket Ration
            </h2>
            <p className="text-xs md:text-sm text-emerald-100 font-medium leading-relaxed">
              Why pay maximum retail price? FreshKart aggregates local supermarket stock directly from regional distribution hubs to guarantee lower prices on Aashirvaad, Amul, Fortune, and Surf Excel.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Free Shipping &gt; ₹499</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> 2-Hour Express Delivery</span>
            </div>
          </div>

          <div className="z-10 shrink-0">
            <Link
              href="/offers"
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black rounded-2xl text-sm transition shadow-2xl flex items-center gap-2 border border-amber-300"
            >
              <span>Explore Weekly Ration Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Weekly Deals Section */}
      <section className="max-w-7xl mx-auto px-4">
        <ProductGrid
          products={weeklyDeals}
          title="Weekly Supermarket Savings"
          subtitle="Handpicked products with up to 30% discount this week."
        />
      </section>

      {/* Popular Near You */}
      <section className="max-w-7xl mx-auto px-4">
        <ProductGrid
          products={popularNearYou}
          title="Popular Near You (Madhapur & Hitec City)"
          subtitle="Frequently bought by neighborhood shoppers in your local area."
        />
      </section>

      {/* Store Benefits Section */}
      <section className="bg-emerald-50/70 border-y border-emerald-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black text-emerald-800 uppercase tracking-widest">Why Shop With FreshKart</span>
            <h2 className="text-2xl md:text-3xl font-black text-emerald-950 mt-1">
              The FreshKart Retail Promise
            </h2>
            <p className="text-xs text-emerald-700 font-semibold mt-1">Built specifically for Indian families and local supermarket shoppers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-amber-300 flex items-center justify-center mx-auto mb-3 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-emerald-950">Everyday Low Prices</h3>
              <p className="text-xs text-neutral-500 mt-1 font-medium">Guaranteed savings below MRP on daily staples and groceries.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-amber-300 flex items-center justify-center mx-auto mb-3 shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-emerald-950">Farm Fresh Daily</h3>
              <p className="text-xs text-neutral-500 mt-1 font-medium">Daily harvested organic fruits, vegetables, and milk pouches.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-amber-300 flex items-center justify-center mx-auto mb-3 shadow-md">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-emerald-950">Fast Local Delivery</h3>
              <p className="text-xs text-neutral-500 mt-1 font-medium">2-hour express delivery slots from our nearest local superstore.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-amber-300 flex items-center justify-center mx-auto mb-3 shadow-md">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-emerald-950">Multiple Payment Options</h3>
              <p className="text-xs text-neutral-500 mt-1 font-medium">Pay via Cash on Delivery, GPay, PhonePe, UPI or Cards.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-amber-300 flex items-center justify-center mx-auto mb-3 shadow-md">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-emerald-950">6+ Hyderabad Stores</h3>
              <p className="text-xs text-neutral-500 mt-1 font-medium">Visit our physical stores in Madhapur, Gachibowli & Jubilee Hills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4 text-center py-6">
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white rounded-3xl p-8 md:p-10 border border-emerald-700 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-400 text-emerald-950 font-bold flex items-center justify-center mx-auto shadow-md">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black">Never Miss a Supermarket Offer</h2>
          <p className="text-xs text-emerald-100 max-w-md mx-auto font-medium">
            Sign up for FreshKart email alerts to receive weekly discount catalogues and instant ₹100 welcome coupon code.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Enter your mobile number or email"
              className="flex-1 bg-emerald-900 border border-emerald-700 rounded-xl px-4 py-3 text-xs text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-400 text-emerald-950 font-black rounded-xl text-xs hover:bg-amber-300 transition shadow-md"
            >
              Get Discount Code
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
