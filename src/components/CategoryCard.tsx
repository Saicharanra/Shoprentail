'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '../types';
import { 
  Apple, 
  Wheat, 
  Milk, 
  Coffee, 
  Cookie, 
  Sparkles, 
  Sparkle, 
  Home,
  ChevronRight
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Apple,
  Wheat,
  Milk,
  Coffee,
  Cookie,
  Sparkles,
  Sparkle,
  Home
};

export const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  const IconComponent = ICON_MAP[category.iconName] || Wheat;

  return (
    <Link
      href={`/shop?category=${category.id}`}
      className="group relative bg-white rounded-3xl p-4 border border-emerald-100 hover:border-emerald-600 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-amber-300 flex items-center justify-center group-hover:from-emerald-800 group-hover:to-emerald-950 transition shrink-0 shadow-md">
          <IconComponent className="w-5 h-5" />
        </div>
        <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full group-hover:bg-emerald-700 group-hover:text-white transition border border-emerald-100">
          {category.itemCount}+ items
        </span>
      </div>

      <div className="relative z-10 my-2">
        <h3 className="text-base font-black text-neutral-900 group-hover:text-emerald-800 transition">
          {category.name}
        </h3>
        <p className="text-xs text-neutral-500 font-medium line-clamp-1 mt-0.5">
          {category.popularItems.join(', ')}
        </p>
      </div>

      {/* Image Thumbnail */}
      <div className="relative h-28 w-full mt-2 rounded-2xl overflow-hidden bg-neutral-50 border border-emerald-50">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
          <span className="text-xs font-black text-amber-300">Shop Category</span>
          <ChevronRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </Link>
  );
};
