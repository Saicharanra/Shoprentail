'use client';

import React from 'react';
import { CartItem } from '../types';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from './QuantitySelector';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

export const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedSize } = item;
  const itemTotal = product.price * quantity;
  const itemMrpTotal = product.mrp * quantity;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-neutral-200 last:border-none">
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-contain rounded-2xl bg-neutral-50 p-2 border border-neutral-200 hover:scale-105 transition"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{product.brand}</span>
        <Link href={`/product/${product.id}`}>
          <h4 className="text-sm font-bold text-neutral-900 truncate hover:underline">{product.name}</h4>
        </Link>
        <p className="text-xs text-neutral-500 mt-0.5">Pack Size: {selectedSize || product.weight}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-black text-black">₹{product.price}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-neutral-400 line-through">₹{product.mrp}</span>
          )}
        </div>
      </div>

      {/* Quantity Control & Actions */}
      <div className="flex flex-col items-end gap-2">
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => updateQuantity(product.id, quantity + 1)}
          onDecrease={() => updateQuantity(product.id, quantity - 1)}
          size="sm"
        />

        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm font-black text-black">₹{itemTotal}</span>
          <button
            onClick={() => removeFromCart(product.id)}
            className="p-1 text-neutral-400 hover:text-rose-600 transition"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
