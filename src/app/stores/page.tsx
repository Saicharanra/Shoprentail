'use client';

import React, { useState } from 'react';
import { HYDERABAD_STORES } from '../../data/products';
import { StoreCard } from '../../components/StoreCard';
import { Store, Search, MapPin, Phone, Clock, Navigation } from 'lucide-react';

export default function StoreLocatorPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = HYDERABAD_STORES.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.pincode.includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-neutral-800 shadow-2xl">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-black uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            HYDERABAD RETAIL NETWORK
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            FreshKart Store Locator
          </h1>
          <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-medium">
            Find your nearest neighborhood FreshKart supermarket in Hyderabad for in-store shopping, curbside pickup, or express local delivery.
          </p>
        </div>
      </div>

      {/* Location Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm max-w-2xl mx-auto space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
          Find Stores Near You (Search Area or Pincode)
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Madhapur, Gachibowli, Jubilee Hills, 500081..."
            className="w-full bg-neutral-50 border border-neutral-300 rounded-2xl pl-11 pr-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400" />
        </div>
      </div>

      {/* Stores Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-neutral-900">
            Available Superstores ({filteredStores.length})
          </h2>
          <span className="text-xs font-bold text-neutral-500">All stores open today</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </div>
  );
}
