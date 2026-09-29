'use client';

import React from 'react';
import { StoreLocation } from '../types';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, ShieldCheck } from 'lucide-react';

export const StoreCard: React.FC<{ store: StoreLocation }> = ({ store }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-neutral-200 hover:border-black hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-xs font-black bg-neutral-900 text-white px-3 py-1 rounded-full uppercase tracking-wider">
            {store.locality}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {store.status}
          </span>
        </div>

        <h3 className="text-lg font-black text-neutral-900 mt-2">{store.name}</h3>
        <p className="text-xs text-neutral-500 mt-1 leading-relaxed flex items-start gap-1.5">
          <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <span>{store.address} (Pincode: {store.pincode})</span>
        </p>

        <div className="space-y-1.5 mt-4 pt-3 border-t border-neutral-100 text-xs text-neutral-600 font-medium">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>{store.hours}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>{store.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold text-neutral-900">{store.distance}</span>
          </div>
        </div>

        {/* Store Amenities Pills */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {store.amenities.map((amenity) => (
            <span
              key={amenity}
              className="text-[10px] font-semibold bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-lg border border-neutral-200"
            >
              ✓ {amenity}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100">
        <a
          href={store.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-bold rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-md"
        >
          <Navigation className="w-4 h-4" />
          <span>Get Store Directions</span>
        </a>
      </div>
    </div>
  );
};
