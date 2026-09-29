'use client';

import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md' | 'lg';
  min?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  size = 'md',
  min = 0
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const btnClasses = isSm
    ? 'p-1 h-7 w-7'
    : isLg
    ? 'p-2 h-10 w-10 text-base'
    : 'p-1.5 h-8 w-8 text-sm';

  return (
    <div className="inline-flex items-center bg-black text-white rounded-lg p-0.5 shadow-sm border border-neutral-800">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDecrease();
        }}
        className={`${btnClasses} flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition font-medium`}
        title={quantity === 1 && min === 0 ? "Remove item" : "Decrease quantity"}
      >
        {quantity === 1 && min === 0 ? <Trash2 className="w-3.5 h-3.5 text-rose-400" /> : <Minus className="w-3.5 h-3.5" />}
      </button>

      <span className={`px-2.5 font-semibold text-center select-none text-white ${isSm ? 'text-xs min-w-[20px]' : isLg ? 'text-base min-w-[32px]' : 'text-sm min-w-[24px]'}`}>
        {quantity}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onIncrease();
        }}
        className={`${btnClasses} flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition font-medium`}
        title="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
