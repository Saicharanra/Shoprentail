'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Rating } from './Rating';
import { QuantitySelector } from './QuantitySelector';
import { ShoppingBag, Heart, Eye } from 'lucide-react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, getItemQuantity, updateQuantity, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();

  const quantityInCart = getItemQuantity(product.id);
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-3xl p-4 border border-emerald-100/80 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Badges & Wishlist Button */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        <div className="flex flex-wrap items-center gap-1">
          {product.discount > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {product.discount}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-emerald-700 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-2 rounded-full border transition ${
            isWishlisted
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-white/80 border-emerald-100 text-neutral-400 hover:text-rose-600 hover:bg-white'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative h-44 w-full mb-3 rounded-2xl bg-neutral-50/80 flex items-center justify-center p-3 border border-emerald-50 overflow-hidden">
        <Link href={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Quick View Floating Button */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute bottom-2 right-2 p-2 bg-emerald-900/90 hover:bg-emerald-900 text-amber-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-md text-xs font-bold flex items-center gap-1"
          title="Quick View"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Quick View</span>
        </button>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-extrabold text-emerald-800 uppercase tracking-widest text-[10px]">
              {product.brand}
            </span>
            <Rating rating={product.rating} reviewCount={product.reviewCount} />
          </div>

          <Link href={`/product/${product.id}`} className="block">
            <h4 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-800 line-clamp-2 leading-snug">
              {product.name}
            </h4>
          </Link>

          <p className="text-xs text-neutral-500 font-semibold mt-1">
            {product.weight}
          </p>
        </div>

        {/* Pricing & Cart Action */}
        <div className="mt-4 pt-3 border-t border-emerald-50 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-emerald-950">₹{product.price}</span>
              {product.mrp > product.price && (
                <span className="text-xs text-neutral-400 line-through">₹{product.mrp}</span>
              )}
            </div>
            {product.mrp > product.price && (
              <p className="text-[10px] font-extrabold text-emerald-700">
                Save ₹{product.mrp - product.price}
              </p>
            )}
          </div>

          <div>
            {quantityInCart > 0 ? (
              <QuantitySelector
                quantity={quantityInCart}
                onIncrease={() => updateQuantity(product.id, quantityInCart + 1)}
                onDecrease={() => updateQuantity(product.id, quantityInCart - 1)}
                size="sm"
              />
            ) : (
              <button
                onClick={() => addToCart(product, 1)}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-black text-xs transition flex items-center gap-1.5 shadow-md hover:shadow-lg border border-emerald-600"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                <span>ADD</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
