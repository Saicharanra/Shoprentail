'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const SearchBar: React.FC<{ placeholder?: string }> = ({
  placeholder = "Search 50+ fresh groceries, atta, milk, fruits, oil..."
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const POPULAR_SEARCHES = ['Aashirvaad Atta', 'Basmati Rice', 'Amul Milk', 'Fortune Oil', 'Shimla Apple', 'Surf Excel', 'Cadbury Silk'];

  useEffect(() => {
    if (query.trim().length > 1) {
      const q = query.toLowerCase();
      const filtered = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 6);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const selectPopular = (term: string) => {
    setQuery(term);
    setIsOpen(false);
    router.push(`/shop?search=${encodeURIComponent(term)}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-neutral-100 hover:bg-neutral-50 text-neutral-900 placeholder-neutral-500 rounded-full py-2.5 pl-11 pr-10 text-sm border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-inner"
        />
        <Search className="absolute left-4 w-4 h-4 text-neutral-500 pointer-events-none" />
        
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 p-1 text-neutral-400 hover:text-neutral-700 rounded-full transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-50 animate-slide-up">
          {query.trim().length > 1 && suggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Matching Products
              </div>
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 transition border-b border-neutral-100 last:border-none"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg shrink-0 border border-neutral-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">{product.name}</p>
                    <p className="text-xs text-neutral-500">{product.brand} • {product.weight}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-black">₹{product.price}</p>
                    <p className="text-xs text-neutral-400 line-through">₹{product.mrp}</p>
                  </div>
                </Link>
              ))}
              <Link
                href={`/shop?search=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-4 py-3 bg-neutral-50 hover:bg-neutral-100 text-xs font-bold text-black transition"
              >
                <span>View all results for &quot;{query}&quot;</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : query.trim().length > 1 && suggestions.length === 0 ? (
            <div className="p-6 text-center text-neutral-500 text-sm">
              No products matching &quot;{query}&quot;. Try searching for &quot;Atta&quot;, &quot;Rice&quot;, or &quot;Milk&quot;.
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                Popular Supermarket Searches
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => selectPopular(term)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white text-neutral-700 rounded-full text-xs font-medium transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
