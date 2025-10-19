'use client';

import React, { useState } from 'react';
import { X, Calendar, ShoppingCart, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/types/product';
import AddToCartModal from './AddToCartModal';
import { getEurConversion } from '@/utils/currency';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, product }) => {
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const { t } = useLanguage();

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${t('common.currency')}`;
  };

  const getUnitLabel = (unit: string) => {
    return unit === 'kg' ? t('common.perKg') : t('common.perL');
  };

  const getCategoryLabel = (category: string) => {
    return t(`common.categories.${category}`);
  };

  const handleBuyClick = () => {
    setShowAddToCartModal(true);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition"
          >
            <X size={24} className="text-[#7A0B18]" />
          </button>

          <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative h-64 lg:h-96 overflow-hidden rounded-xl">
                <img
                  src={product.imageUrl}
                  alt={t(product.nameKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#4C8F3A] text-white text-sm px-4 py-2 rounded-full font-medium">
                  {getCategoryLabel(product.category)}
                </div>
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-[#EFBF3A] text-[#7A0B18] text-sm px-4 py-2 rounded-full font-bold">
                    {t('common.recommended')}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl text-[#7A0B18] mb-3">
                  {t(product.nameKey)}
                </h2>
                <p className="text-[#6B4423] text-base leading-relaxed">
                  {t(product.descriptionKey)}
                </p>
              </div>

              {/* Price */}
              <div className="bg-[#FFF7ED] rounded-lg p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div>
                      <span className="text-2xl lg:text-3xl font-bold text-[#C4312E]">
                        {formatPrice(product.pricePerUnit)}
                      </span>
                      <span className="text-base text-[#6B4423] ml-2">
                        {getUnitLabel(product.unit)}
                      </span>
                    </div>
                    <div className="text-sm text-[#6B4423] mt-1">
                      {getEurConversion(product.pricePerUnit)}
                    </div>
                  </div>
                  <div className="flex text-[#EFBF3A]">
                    {Array.from({ length: product.rating || 5 }).map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Season */}
              <div className="flex items-center space-x-2 text-[#6B4423]">
                <Calendar size={18} />
                <span className="text-base">
                  <strong>{t('common.season')}:</strong> {t(product.seasonKey)}
                </span>
              </div>

              {/* Varieties */}
              {product.varieties && product.varieties.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-[#7A0B18] mb-2">
                    {t('common.variety')}:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.varieties.map((variety) => (
                      <span
                        key={variety.id}
                        className="bg-[#FFF7ED] text-[#6B4423] px-3 py-2 rounded-lg border border-[#E5E5E5] text-sm"
                      >
                        {t(variety.nameKey)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Buy Button */}
              <button
                onClick={handleBuyClick}
                className="w-full bg-[#C4312E] text-white px-6 py-3 rounded-lg hover:bg-[#A02820] transition transform hover:scale-105 font-medium text-lg flex items-center justify-center space-x-3"
              >
                <ShoppingCart size={22} />
                <span>{t('common.buy')}</span>
              </button>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-base font-semibold text-[#7A0B18] mb-2">
                  {t('products.learn_more')}
                </h3>
                <div className="space-y-1 text-sm text-[#6B4423]">
                  <p><strong>{t('common.categories.fruits')}:</strong> {getCategoryLabel(product.category)}</p>
                  <p><strong>{t('common.minQty')}:</strong> {product.unit}</p>
                  <p><strong>{t('common.total')}:</strong> {formatPrice(product.pricePerUnit)}{getUnitLabel(product.unit)}</p>
                  {product.featured && (
                    <p className="text-[#EFBF3A] font-medium">⭐ {t('common.recommended')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      {showAddToCartModal && (
        <AddToCartModal
          isOpen={showAddToCartModal}
          onClose={() => {
            setShowAddToCartModal(false);
          }}
          product={product}
        />
      )}
    </>
  );
};

export default ProductDetailModal;

