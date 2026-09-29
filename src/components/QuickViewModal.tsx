'use client';

import React, { useState } from 'react';
import { X, ShoppingBag, Heart, ShieldCheck, Truck, Clock, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Rating } from './Rating';
import { QuantitySelector } from './QuantitySelector';
import Link from 'next/link';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, getItemQuantity, updateQuantity, toggleWishlist, isInWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const quantityInCart = getItemQuantity(product.id);
  const isWishlisted = isInWishlist(product.id);
  const currentSize = selectedSize || product.sizes[0] || product.weight;

  const handleClose = () => setQuickViewProduct(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-neutral-200 relative animate-slide-up max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-black transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative bg-neutral-50 rounded-2xl p-4 flex items-center justify-center border border-neutral-100">
            {product.discount > 0 && (
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {product.discount}% OFF
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="max-h-64 object-contain rounded-xl"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{product.brand}</span>
                <Rating rating={product.rating} reviewCount={product.reviewCount} />
              </div>

              <h2 className="text-lg font-bold text-neutral-900 leading-snug">{product.name}</h2>
              <p className="text-xs text-neutral-500 mt-1">Pack Size: <span className="font-semibold text-neutral-800">{product.weight}</span></p>

              {/* Price Row */}
              <div className="flex items-baseline gap-2.5 my-3">
                <span className="text-2xl font-black text-black">₹{product.price}</span>
                {product.mrp > product.price && (
                  <>
                    <span className="text-sm text-neutral-400 line-through">₹{product.mrp}</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Save ₹{product.mrp - product.price}
                    </span>
                  </>
                )}
              </div>

              <p className="text-xs text-neutral-600 line-clamp-3 mb-4">{product.description}</p>

              {/* Available Sizes */}
              {product.sizes.length > 1 && (
                <div className="mb-4">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Available Options
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                          currentSize === sz
                            ? 'border-black bg-black text-white'
                            : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-3 border-t border-neutral-100">
              <div className="flex items-center gap-3">
                {quantityInCart > 0 ? (
                  <div className="flex-1 flex items-center justify-between bg-neutral-100 p-2 rounded-xl">
                    <span className="text-xs font-bold text-neutral-700">In Cart:</span>
                    <QuantitySelector
                      quantity={quantityInCart}
                      onIncrease={() => updateQuantity(product.id, quantityInCart + 1)}
                      onDecrease={() => updateQuantity(product.id, quantityInCart - 1)}
                      size="md"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product, 1, currentSize)}
                    className="flex-1 py-3 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                )}

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition ${
                    isWishlisted ? 'border-rose-300 bg-rose-50 text-rose-600' : 'border-neutral-200 text-neutral-500 hover:text-rose-600'
                  }`}
                  title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <Link
                href={`/product/${product.id}`}
                onClick={handleClose}
                className="block text-center text-xs font-bold text-neutral-600 hover:text-black hover:underline py-1"
              >
                View Complete Product Details & Key Features →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
