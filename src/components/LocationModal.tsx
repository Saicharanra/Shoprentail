'use client';

import React, { useState } from 'react';
import { X, MapPin, Navigation, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { HYDERABAD_STORES } from '../data/products';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const { location, setLocation } = useCart();
  const [customPincode, setCustomPincode] = useState('');

  if (!isOpen) return null;

  const handleSelectLocality = (locality: string, pincode: string) => {
    setLocation({ locality, pincode });
    onClose();
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPincode.length === 6) {
      setLocation({ locality: `Pincode ${customPincode}`, pincode: customPincode });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 relative animate-slide-up overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">Select Delivery Location</h3>
              <p className="text-xs text-neutral-500">Fast 2-hour local delivery in Hyderabad</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Enter Pincode form */}
        <form onSubmit={handlePincodeSubmit} className="mt-5">
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            Enter Hyderabad Pincode
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={customPincode}
              onChange={(e) => setCustomPincode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 500081"
              className="flex-1 bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              disabled={customPincode.length !== 6}
              className="px-5 py-2.5 bg-black disabled:bg-neutral-300 text-white rounded-xl text-sm font-bold hover:bg-neutral-800 transition"
            >
              Apply
            </button>
          </div>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px bg-neutral-200 flex-1" />
          <span className="text-xs font-semibold text-neutral-400 uppercase">Or Select Nearest Supermarket Area</span>
          <div className="h-px bg-neutral-200 flex-1" />
        </div>

        {/* Preset Store Localities */}
        <div className="grid grid-cols-1 gap-2.5 max-h-60 overflow-y-auto pr-1">
          {HYDERABAD_STORES.map((store) => {
            const isSelected = location.locality === store.locality;
            return (
              <button
                key={store.id}
                onClick={() => handleSelectLocality(store.locality, store.pincode)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition ${
                  isSelected
                    ? 'border-black bg-neutral-900 text-white shadow-md'
                    : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Navigation className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-neutral-500'}`} />
                  <div>
                    <p className="text-sm font-bold">{store.locality}</p>
                    <p className={`text-xs ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      Pincode: {store.pincode} • {store.distance}
                    </p>
                  </div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
