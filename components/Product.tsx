'use client';

import React, { useState } from 'react';
import { Calendar, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';
import { Product as ProductType } from '@/types/product';
import AddToCartModal from './AddToCartModal';

const Product = () => {
  const [activeProduct, setActiveProduct] = useState<ProductType | null>(null);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  const handleBuyClick = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation(); // Prevent card click
    setActiveProduct(product);
    setShowAddToCartModal(true);
  };

  const handleCardClick = (product: ProductType) => {
    setActiveProduct(product);
    // Navigate to product detail page
    router.push(`/product/${product.id}`);
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${t('common.currency')}`;
  };

  const getUnitLabel = (unit: string) => {
    return unit === 'kg' ? t('common.perKg') : t('common.perL');
  };

  const getCategoryLabel = (category: string) => {
    return t(`common.categories.${category}`);
  };

  return (
    <>
      <section id="products" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-4">{t('products.title')}</h2>
            <p className="text-[#6B4423] text-lg max-w-2xl mx-auto">
              {t('products.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-[#FFF7ED] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => handleCardClick(product)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={t(product.nameKey)}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#4C8F3A] text-white text-xs px-3 py-1 rounded-full font-medium">
                    {getCategoryLabel(product.category)}
                  </div>
                  {product.featured && (
                    <div className="absolute top-4 left-4 bg-[#EFBF3A] text-[#7A0B18] text-xs px-3 py-1 rounded-full font-bold">
                      {t('common.recommended')}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h4 className="font-serif text-2xl text-[#7A0B18] mb-2">{t(product.nameKey)}</h4>
                  <p className="text-[#6B4423] text-sm mb-3">{t(product.descriptionKey)}</p>
                  
                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-lg font-bold text-[#C4312E]">
                      {formatPrice(product.pricePerUnit)}{getUnitLabel(product.unit)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-[#8B8680] mb-4">
                    <span className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{t(product.seasonKey)}</span>
                    </span>
                    <div className="flex text-[#EFBF3A]">
                      ★★★★★
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => handleBuyClick(e, product)}
                      className="flex-1 bg-[#C4312E] text-white px-4 py-2 rounded-lg hover:bg-[#A02820] transition transform hover:scale-105 font-medium flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart size={16} />
                      <span>{t('common.buy')}</span>
                    </button>
                    <span className="text-[#C4312E] font-medium hover:underline flex items-center">
                      {t('common.learnMore')} →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Badge */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-[#EFBF3A] text-[#7A0B18] px-6 py-3 rounded-full font-bold text-lg shadow-lg">
              🍾 {t('products.vinegar')}
            </div>
          </div>
        </div>
      </section>

      {/* Add to Cart Modal */}
      {activeProduct && (
        <AddToCartModal
          isOpen={showAddToCartModal}
          onClose={() => setShowAddToCartModal(false)}
          product={activeProduct}
        />
      )}
    </>
  );
};

export default Product;
