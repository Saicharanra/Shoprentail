'use client';

import React from 'react';
import { CATEGORIES } from '../data/products';
import { CategoryId } from '../types';
import { Filter, X, RotateCcw, Check, Star } from 'lucide-react';

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
  minDiscount: number;
  onDiscountChange: (discount: number) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  allBrands: string[];
  onReset: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  maxPrice,
  onPriceChange,
  minDiscount,
  onDiscountChange,
  minRating,
  onRatingChange,
  allBrands,
  onReset,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-emerald-800" />
          <h3 className="text-base font-black text-emerald-950">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-black text-emerald-700 hover:text-emerald-950 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-3">Categories</h4>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
              selectedCategory === 'all'
                ? 'bg-emerald-700 text-amber-300 shadow-md font-black'
                : 'text-neutral-700 hover:bg-emerald-50'
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === 'all' && <Check className="w-3.5 h-3.5 text-amber-300" />}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-amber-300 shadow-md font-black'
                  : 'text-neutral-700 hover:bg-emerald-50'
              }`}
            >
              <span>{cat.name}</span>
              {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-amber-300" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-emerald-100">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800">Max Price</h4>
          <span className="text-xs font-black text-emerald-950 bg-amber-300/80 px-2 py-0.5 rounded">₹{maxPrice}</span>
        </div>
        <input
          type="range"
          min={30}
          max={1200}
          step={20}
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-emerald-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-emerald-800 font-bold mt-1">
          <span>₹30</span>
          <span>₹600</span>
          <span>₹1,200</span>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="pt-4 border-t border-emerald-100">
        <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-3">Popular Brands</h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => onSelectBrand('all')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedBrand === 'all' ? 'bg-emerald-900 text-amber-300 font-black' : 'text-neutral-700 hover:bg-emerald-50'
            }`}
          >
            All Brands
          </button>
          {allBrands.map((b) => (
            <button
              key={b}
              onClick={() => onSelectBrand(b)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedBrand === b ? 'bg-emerald-900 text-amber-300 font-black' : 'text-neutral-700 hover:bg-emerald-50'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Discount Filter */}
      <div className="pt-4 border-t border-emerald-100">
        <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-2">Minimum Discount</h4>
        <div className="flex flex-wrap gap-2">
          {[0, 10, 20, 30].map((d) => (
            <button
              key={d}
              onClick={() => onDiscountChange(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                minDiscount === d
                  ? 'border-emerald-700 bg-emerald-700 text-amber-300 font-black shadow-sm'
                  : 'border-emerald-100 text-neutral-700 hover:border-emerald-300'
              }`}
            >
              {d === 0 ? 'Any' : `${d}%+ OFF`}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="pt-4 border-t border-emerald-100">
        <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-2">Rating Filter</h4>
        <div className="space-y-1">
          {[0, 4.5, 4.7, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => onRatingChange(r)}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                minRating === r ? 'bg-emerald-900 text-amber-300 font-black' : 'text-neutral-700 hover:bg-emerald-50'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{r === 0 ? 'All Ratings' : `${r}★ & above`}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm h-fit">
        {content}
      </div>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-100">
              <span className="font-black text-lg text-emerald-950">Filter Supermarket</span>
              <button onClick={onCloseMobile} className="p-1 hover:bg-emerald-50 rounded-lg">
                <X className="w-5 h-5 text-emerald-900" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};
