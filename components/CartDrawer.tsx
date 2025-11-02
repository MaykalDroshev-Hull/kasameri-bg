// components/CartDrawer.tsx
'use client';

import React from 'react';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/types/product';
import OrderModal from './OrderModal';
import { getEurConversion } from '@/utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const [showOrderModal, setShowOrderModal] = React.useState(false);
  const { t } = useLanguage();
  const { items, updateQty, remove, clear, subtotal } = useCartStore();

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${t('common.currency')}`;
  };

  const getUnitLabel = (unit: string) => {
    if (unit === 'kg') return t('common.perKg');
    if (unit === 'l') return t('common.perL');
    if (unit === 'pack') return t('common.perPack');
    return unit;
  };

  const getUnitDisplayName = (unit: string) => {
    if (unit === 'kg') return 'кг';
    if (unit === 'l') return 'л';
    if (unit === 'pack') return t('common.box');
    return unit;
  };

  const getStepSize = (unit: string) => {
    return unit === 'l' ? 3 : 1; // Juice: step 3, Others: step 1
  };

  const getMinQty = (unit: string) => {
    return unit === 'l' ? 3 : 1; // Juice: min 3, Others: min 1
  };

  const handleQuantityChange = (item: CartItem, newQty: number) => {
    const minQty = getMinQty(item.unit);
    if (newQty < minQty) {
      remove(item.id, item.varietyKey, item.notes);
    } else {
      updateQty(item.id, newQty, item.varietyKey, item.notes);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowOrderModal(true);
  };

  const handleOrderModalClose = () => {
    setShowOrderModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <ShoppingCart size={24} className="text-[#7A0B18]" />
              <h2 className="text-xl font-bold text-[#7A0B18]">{t('common.cart')}</h2>
              {items.length > 0 && (
                <span className="bg-[#C4312E] text-white text-xs px-2 py-1 rounded-full">
                  {items.length} {t('cart.itemCount')}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <ShoppingCart size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">{t('cart.empty')}</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.varietyKey}-${item.notes}-${index}`} className="bg-[#FFF7ED] rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt={t(item.nameKey)}
                          fill
                          quality={90}
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[#7A0B18] truncate">
                          {t(item.nameKey)}
                        </h3>
                        {item.varietyKey && (
                          <p className="text-sm text-[#6B4423]">
                            {t('common.variety')}: {t(item.varietyKey)}
                          </p>
                        )}
                        <p className="text-sm text-[#6B4423]">
                          {formatPrice(item.pricePerUnit)}{getUnitLabel(item.unit)}{' '}
                          <span className="text-xs">{getEurConversion(item.pricePerUnit)}</span>
                        </p>
                        {item.notes && (
                          <p className="text-xs text-gray-500 mt-1 italic">
                            "{item.notes}"
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => remove(item.id, item.varietyKey, item.notes)}
                        className="p-1 hover:bg-red-100 rounded transition"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item, item.qty - getStepSize(item.unit))}
                          className="p-1 hover:bg-gray-200 rounded transition"
                          disabled={item.qty <= getMinQty(item.unit)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-16 text-center font-medium">
                          {item.qty} {getUnitDisplayName(item.unit)}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, item.qty + getStepSize(item.unit))}
                          className="p-1 hover:bg-gray-200 rounded transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#7A0B18]">
                          {formatPrice(item.qty * item.pricePerUnit)}{' '}
                          <span className="text-xs font-normal">{getEurConversion(item.qty * item.pricePerUnit)}</span>
                        </p>
                        <p className="text-xs text-gray-500">{t('cart.lineTotal')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{t('common.subtotal')}:</span>
                <span className="text-xl font-bold text-[#7A0B18]">
                  {formatPrice(subtotal())}{' '}
                  <span className="text-sm font-normal">{getEurConversion(subtotal())}</span>
                </span>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={clear}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  {t('common.clearCart')}
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 px-4 py-2 bg-[#C4312E] text-white rounded-lg hover:bg-[#A02820] transition"
                >
                  {t('common.checkout')}
                </button>
              </div>
              
              <button
                onClick={onClose}
                className="w-full px-4 py-2 border border-[#7A0B18] text-[#7A0B18] rounded-lg hover:bg-[#7A0B18] hover:text-white transition"
              >
                {t('common.continueShopping')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={showOrderModal}
        onClose={handleOrderModalClose}
      />
    </div>
  );
};

export default CartDrawer;
