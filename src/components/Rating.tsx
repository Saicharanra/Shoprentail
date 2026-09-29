'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 bg-neutral-900 text-white font-semibold rounded px-1.5 py-0.5 text-xs">
        <span>{rating.toFixed(1)}</span>
        <Star className={`${iconSize} fill-amber-400 text-amber-400 shrink-0`} />
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-neutral-500 font-medium">({reviewCount})</span>
      )}
    </div>
  );
};
