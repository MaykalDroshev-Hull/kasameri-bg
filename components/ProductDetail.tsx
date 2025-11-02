// components/ProductDetail.tsx
'use client';

import React, { useState } from 'react';
import { Calendar, ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProductById } from '@/data/products';
import { Product } from '@/types/product';
import AddToCartModal from './AddToCartModal';
import { getEurConversion } from '@/utils/currency';

interface ProductDetailProps {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();
  
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#7A0B18] mb-4">Product Not Found</h1>
          <a href="/" className="text-[#C4312E] hover:underline">← Back to Home</a>
        </div>
      </div>
    );
  }

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

  const getCategoryLabel = (category: string) => {
    return t(`common.categories.${category}`);
  };

  const handleBuyClick = () => {
    setShowAddToCartModal(true);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-[#7A0B18] hover:text-[#C4312E] transition mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-2xl">
                <Image
                  src={product.imageUrl}
                  alt={t(product.nameKey)}
                  fill
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
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
                <h1 className="font-serif text-4xl lg:text-5xl text-[#7A0B18] mb-4">
                  {t(product.nameKey)}
                </h1>
                <p className="text-[#6B4423] text-lg leading-relaxed">
                  {t(product.descriptionKey)}
                </p>
              </div>

              {/* Price */}
              <div className="bg-[#FFF7ED] rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div>
                      <span className="text-3xl font-bold text-[#C4312E]">
                        {formatPrice(product.pricePerUnit)}
                      </span>
                      <span className="text-lg text-[#6B4423] ml-2">
                        {getUnitLabel(product.unit)}
                      </span>
                    </div>
                    <div className="text-sm text-[#6B4423] mt-1">
                      {getEurConversion(product.pricePerUnit)}
                    </div>
                  </div>
                  <div className="flex text-[#EFBF3A] text-xl">
                    {Array.from({ length: product.rating || 5 }).map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Season */}
              <div className="flex items-center space-x-2 text-[#6B4423]">
                <Calendar size={20} />
                <span className="text-lg">
                  <strong>{t('common.season')}:</strong> {t(product.seasonKey)}
                </span>
              </div>

              {/* Varieties */}
              {product.varieties && product.varieties.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-[#7A0B18] mb-3">
                    {t('common.variety')}:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.varieties.map((variety) => (
                      <span
                        key={variety.id}
                        className="bg-[#FFF7ED] text-[#6B4423] px-3 py-2 rounded-lg border border-[#E5E5E5]"
                      >
                        {t(variety.nameKey)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleBuyClick}
                className="w-full bg-[#C4312E] text-white px-8 py-4 rounded-lg hover:bg-[#A02820] transition transform hover:scale-105 font-medium text-lg flex items-center justify-center space-x-3 shadow-lg"
              >
                <ShoppingCart size={24} />
                <span>{t('common.addToCart')}</span>
              </button>
              
              <p className="text-sm text-center text-[#6B4423]">
                💡 {t('common.orderFlow')}
              </p>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#7A0B18] mb-3">
                  Product Information
                </h3>
                <div className="space-y-2 text-[#6B4423]">
                  <p><strong>Category:</strong> {getCategoryLabel(product.category)}</p>
                  <p><strong>Unit:</strong> {getUnitDisplayName(product.unit)}</p>
                  <p><strong>Price:</strong> {formatPrice(product.pricePerUnit)}{getUnitLabel(product.unit)}</p>
                  {product.featured && (
                    <p className="text-[#EFBF3A] font-medium">⭐ Featured Product</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      <AddToCartModal
        isOpen={showAddToCartModal}
        onClose={() => setShowAddToCartModal(false)}
        product={product}
      />
    </>
  );
};

export default ProductDetail;
