'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { ProductGrid } from '../../components/ProductGrid';
import { FilterSidebar } from '../../components/FilterSidebar';
import { SearchBar } from '../../components/SearchBar';
import { useCart } from '../../context/CartContext';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Heart, Search } from 'lucide-react';

function ShopPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const isWishlistOnly = searchParams.get('wishlist') === 'true';

  const { wishlist } = useCart();

  const [category, setCategory] = useState<string>(initialCategory);
  const [brand, setBrand] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1200);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'popularity'>('relevance');
  const [isMobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Extract all distinct brand names
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    PRODUCTS.forEach((p) => brandsSet.add(p.brand));
    return Array.from(brandsSet).sort();
  }, []);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (isWishlistOnly) {
      result = result.filter((p) => wishlist.includes(p.id));
    }

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (brand !== 'all') {
      result = result.filter((p) => p.brand === brand);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    result = result.filter((p) => p.price <= maxPrice);

    if (minDiscount > 0) {
      result = result.filter((p) => p.discount >= minDiscount);
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [category, brand, searchQuery, maxPrice, minDiscount, minRating, sortBy, isWishlistOnly, wishlist]);

  const handleResetFilters = () => {
    setCategory('all');
    setBrand('all');
    setMaxPrice(1200);
    setMinDiscount(0);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('relevance');
  };

  const selectedCatObj = CATEGORIES.find((c) => c.id === category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-neutral-900 tracking-tight">
              {isWishlistOnly
                ? 'My Saved Wishlist'
                : selectedCatObj
                ? selectedCatObj.name
                : searchQuery
                ? `Results for "${searchQuery}"`
                : 'All Supermarket Products'}
            </h1>
            {isWishlistOnly && <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />}
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            {selectedCatObj ? selectedCatObj.description : 'Everyday low prices on fresh groceries, atta, milk, snacks & household care.'}
          </p>
        </div>

        {/* Search Bar inside Shop Header */}
        <div className="w-full md:w-80">
          <SearchBar placeholder="Search in this category..." />
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="flex gap-8 items-start">
        {/* Filter Sidebar Desktop */}
        <FilterSidebar
          selectedCategory={category}
          onSelectCategory={setCategory}
          selectedBrand={brand}
          onSelectBrand={setBrand}
          maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
          minDiscount={minDiscount}
          onDiscountChange={setMinDiscount}
          minRating={minRating}
          onRatingChange={setMinRating}
          allBrands={allBrands}
          onReset={handleResetFilters}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />

        {/* Product Grid Area */}
        <div className="flex-1 space-y-4">
          {/* Top Sort & Filter Control Bar */}
          <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-black text-white font-bold rounded-xl"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <span className="font-bold text-neutral-600 hidden sm:inline">
                Showing <strong className="text-black">{filteredProducts.length}</strong> Products
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-500 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-neutral-300 rounded-xl px-3 py-1.5 font-bold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Popularity (Most Reviewed)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(category !== 'all' || brand !== 'all' || searchQuery || minDiscount > 0 || minRating > 0) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Active Filters:</span>
              {category !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  Category: {category}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setCategory('all')} />
                </span>
              )}
              {brand !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  Brand: {brand}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setBrand('all')} />
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  Query: {searchQuery}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}
              {minDiscount > 0 && (
                <span className="inline-flex items-center gap-1 bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {minDiscount}%+ Discount
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setMinDiscount(0)} />
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-rose-600 hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid Render */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-neutral-500 text-sm font-semibold">Loading supermarket products...</div>}>
      <ShopPageContent />
    </Suspense>
  );
}
