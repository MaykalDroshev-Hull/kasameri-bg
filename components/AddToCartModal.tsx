// components/AddToCartModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/store/cartStore';
import { Product, Variety } from '@/types/product';
import { getEurConversion } from '@/utils/currency';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({ isOpen, onClose, product }) => {
  const { t } = useLanguage();
  const { add } = useCartStore();
  
  const [selectedVariety, setSelectedVariety] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0.5);
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get min/max/step based on product type
  const getQuantityConfig = () => {
    if (product.unit === 'l') {
      // Juice: start at 3, step 3, max 30
      return { min: 3, max: 30, step: 3, initial: 3 };
    } else {
      // Fruits/vegetables: start at 1, step 1, max 25
      return { min: 1, max: 25, step: 1, initial: 1 };
    }
  };

  const quantityConfig = getQuantityConfig();

  useEffect(() => {
    if (isOpen) {
      if (product.varieties && product.varieties.length > 0) {
        setSelectedVariety(product.varieties[0].id);
      }
      // Reset form when opening
      setQuantity(quantityConfig.initial);
      setNotes('');
      setErrors({});
    }
  }, [isOpen, product, quantityConfig.initial]);

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${t('common.currency')}`;
  };

  const getUnitLabel = (unit: string) => {
    return unit === 'kg' ? t('common.perKg') : t('common.perL');
  };

  const getCategoryLabel = (category: string) => {
    return t(`common.categories.${category}`);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (product.varieties && product.varieties.length > 0 && !selectedVariety) {
      newErrors.variety = t('cart.validation.varietyRequired');
    }
    
    if (quantity < quantityConfig.min) {
      newErrors.quantity = `${t('cart.validation.qtyMin')}: ${quantityConfig.min}`;
    }
    
    if (notes.length > 140) {
      newErrors.notes = t('cart.validation.notesMax');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuantityChange = (delta: number) => {
    const step = quantityConfig.step;
    const newQty = Math.max(quantityConfig.min, Math.min(quantityConfig.max, quantity + delta));
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    if (!validateForm()) return;
    
    const varietyKey = product.varieties && product.varieties.length > 0 ? selectedVariety : undefined;
    
    add({
      id: product.id,
      nameKey: product.nameKey,
      varietyKey,
      unit: product.unit,
      pricePerUnit: product.pricePerUnit,
      qty: quantity,
      notes: notes.trim() || undefined,
      imageUrl: product.imageUrl
    });
    
    // Reset and close
    handleClose();
  };

  const handleClose = () => {
    setSelectedVariety('');
    setQuantity(0.5);
    setNotes('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={t(product.nameKey)}
                  fill
                  quality={90}
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#7A0B18]">
                  {t(product.nameKey)}
                </h2>
                <span className="text-xs bg-[#4C8F3A] text-white px-2 py-1 rounded-full">
                  {getCategoryLabel(product.category)}
                </span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Variety Selection */}
            {product.varieties && product.varieties.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-[#7A0B18] mb-3">
                  {t('common.variety')} <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {product.varieties.map((variety) => (
                    <label key={variety.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="variety"
                        value={variety.id}
                        checked={selectedVariety === variety.id}
                        onChange={(e) => setSelectedVariety(e.target.value)}
                        className="text-[#C4312E] focus:ring-[#C4312E]"
                      />
                      <span className="text-[#6B4423]">{t(variety.nameKey)}</span>
                    </label>
                  ))}
                </div>
                {errors.variety && (
                  <p className="text-red-500 text-sm mt-1">{errors.variety}</p>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-[#7A0B18] mb-3">
                {t('common.quantity')} ({product.unit})
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-quantityConfig.step)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  disabled={quantity <= quantityConfig.min}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(quantityConfig.min, Math.min(quantityConfig.max, parseFloat(e.target.value) || quantityConfig.min)))}
                  step={quantityConfig.step}
                  min={quantityConfig.min}
                  max={quantityConfig.max}
                  className="w-20 text-center border border-gray-300 rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(quantityConfig.step)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t('common.minQty')}: {quantityConfig.min}, {t('common.step')}: {quantityConfig.step}
              </p>
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-[#7A0B18] mb-3">
                {t('common.notes')} ({t('common.maxChars')}: 140)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={140}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none resize-none"
                placeholder={t('common.notes')}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">
                  {notes.length}/140 {t('common.maxChars')}
                </span>
                {errors.notes && (
                  <span className="text-red-500 text-xs">{errors.notes}</span>
                )}
              </div>
            </div>

            {/* Price Preview */}
            <div className="bg-[#FFF7ED] rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-[#6B4423]">
                  {quantity} {product.unit} × {formatPrice(product.pricePerUnit)}{' '}
                  <span className="text-xs">{getEurConversion(product.pricePerUnit)}</span>
                </span>
                <span className="text-lg font-bold text-[#7A0B18]">
                  {formatPrice(quantity * product.pricePerUnit)}{' '}
                  <span className="text-sm font-normal">{getEurConversion(quantity * product.pricePerUnit)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex space-x-3 p-6 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 px-4 py-3 bg-[#C4312E] text-white rounded-lg hover:bg-[#A02820] transition flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={16} />
              <span>{t('common.addToCart')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
