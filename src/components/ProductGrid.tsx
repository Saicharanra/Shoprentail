'use client';

import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { SearchX, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  emptyMessage = "No supermarket products matched your search or filters."
}) => {
  return (
    <div className="w-full">
      {title && (
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-neutral-200 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight">{title}</h2>
            {subtitle && <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>}
          </div>
          <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full w-max">
            Showing {products.length} Items
          </span>
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-neutral-50 rounded-3xl p-12 text-center border border-neutral-200 my-6 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900">No Products Found</h3>
          <p className="text-xs text-neutral-500 mt-1 mb-6 leading-relaxed">
            {emptyMessage}
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-bold text-xs rounded-xl hover:bg-neutral-800 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Reset Filters & Browse All</span>
          </Link>
        </div>
      )}
    </div>
  );
};
