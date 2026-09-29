'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS, PRODUCT_REVIEWS } from '../../../data/products';
import { useCart } from '../../../context/CartContext';
import { Rating } from '../../../components/Rating';
import { QuantitySelector } from '../../../components/QuantitySelector';
import { ProductGrid } from '../../../components/ProductGrid';
import { 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Share2
} from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const { addToCart, getItemQuantity, updateQuantity, toggleWishlist, isInWishlist } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || product.weight);
  const quantityInCart = getItemQuantity(product.id);
  const isWishlisted = isInWishlist(product.id);

  // Similar products
  const similarProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleBuyNow = () => {
    if (quantityInCart === 0) {
      addToCart(product, 1, selectedSize);
    }
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
        <Link href="/" className="hover:text-black">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-black">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-black">{product.categoryName}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neutral-900 font-bold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product View Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Product Image */}
        <div className="space-y-4">
          <div className="relative bg-neutral-50 rounded-3xl p-8 border border-neutral-200 flex items-center justify-center min-h-[380px]">
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                {product.discount}% OFF
              </span>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full border transition ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-neutral-200 text-neutral-400 hover:text-rose-600'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="max-h-[340px] max-w-full object-contain"
            />
          </div>
        </div>

        {/* Right: Product Meta & Purchase Box */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">{product.brand}</span>
              <Rating rating={product.rating} reviewCount={product.reviewCount} size="md" />
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-neutral-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-xs font-semibold text-neutral-500 mt-2">
              Pack Size / Weight: <strong className="text-neutral-800 font-bold">{selectedSize}</strong>
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 flex items-baseline gap-3">
            <span className="text-3xl font-black text-black">₹{product.price}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-base text-neutral-400 line-through">₹{product.mrp}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Save ₹{product.mrp - product.price} ({product.discount}% Discount)
                </span>
              </>
            )}
          </div>

          {/* Size Options Toggle */}
          {product.sizes.length > 1 && (
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Select Available Size / Quantity Pack
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
                      selectedSize === sz
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cart & Buy Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {quantityInCart > 0 ? (
                <div className="flex-1 flex items-center justify-between bg-neutral-100 p-3 rounded-2xl border border-neutral-200">
                  <span className="text-xs font-bold text-neutral-800">Quantity in Cart:</span>
                  <QuantitySelector
                    quantity={quantityInCart}
                    onIncrease={() => updateQuantity(product.id, quantityInCart + 1)}
                    onDecrease={() => updateQuantity(product.id, quantityInCart - 1)}
                    size="lg"
                  />
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product, 1, selectedSize)}
                  className="flex-1 py-4 bg-black hover:bg-neutral-800 text-white font-extrabold rounded-2xl text-sm transition flex items-center justify-center gap-2 shadow-xl"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              )}

              <button
                onClick={handleBuyNow}
                className="px-6 py-4 bg-neutral-900 hover:bg-black text-white font-black rounded-2xl text-sm transition border border-neutral-700"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Retail Trust Highlights */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-200 text-xs">
            <div className="flex items-center gap-2 text-neutral-700 font-medium">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>2-Hour Express Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700 font-medium">
              <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Easy Doorstep Replacement</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700 font-medium">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Fresh Batch Stock</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-neutral-200">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-black text-neutral-900 mb-3">Product Description</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-black text-neutral-900 mb-3">Key Features & Benefits</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-neutral-700">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Reviews Section */}
          <div className="pt-6 border-t border-neutral-200 space-y-4">
            <h3 className="text-lg font-black text-neutral-900">Verified Customer Reviews</h3>
            <div className="space-y-3">
              {PRODUCT_REVIEWS.map((rev) => (
                <div key={rev.id} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-900">{rev.userName}</span>
                      <span className="text-[10px] text-neutral-500 ml-2">({rev.userCity})</span>
                    </div>
                    <Rating rating={rev.rating} showCount={false} />
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">&quot;{rev.comment}&quot;</p>
                  <span className="text-[10px] font-bold text-emerald-600">✓ Verified Supermarket Purchaser</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="pt-8 border-t border-neutral-200">
          <ProductGrid
            products={similarProducts}
            title="Similar Supermarket Essentials"
            subtitle="Customers also ordered these items from the same category."
          />
        </section>
      )}
    </div>
  );
}
