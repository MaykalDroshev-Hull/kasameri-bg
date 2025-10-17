'use client';

import React, { useState } from 'react';
import { Calendar, ShoppingCart, Star, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product as ProductType } from '@/types/product';
import { products as productsData } from '@/data/products';
import ProductDetailModal from './ProductDetailModal';

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { t } = useLanguage();

  const handleCardClick = (product: ProductType) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const getCategoryLabel = (category: string) => {
    return t(`common.categories.${category}`);
  };

  // Determine premium/featured products
  const isPremiumProduct = (productId: string) => {
    return productId === 'apples' || productId === 'cherries';
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
            {productsData.map((product) => {
              const isPremium = isPremiumProduct(product.id);
              const isJuice = product.id === 'apple_juice';
              
              return (
                <div 
                  key={product.id}
                  className={`
                    ${isPremium ? 'md:col-span-2 lg:col-span-1' : 'md:col-span-1'}
                    bg-[#FFF7ED] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer
                    ${isPremium ? 'ring-4 ring-[#EFBF3A] ring-offset-2' : ''}
                  `}
                  onClick={() => handleCardClick(product)}
                >
                  <div className={`relative ${isPremium ? 'h-80' : 'h-64'} overflow-hidden`}>
                    <img 
                      src={product.imageUrl} 
                      alt={t(product.nameKey)}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[#4C8F3A] text-white text-xs px-3 py-1 rounded-full font-medium">
                      {getCategoryLabel(product.category)}
                    </div>
                    {isPremium && (
                      <>
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-[#EFBF3A] to-[#FFD15C] text-[#7A0B18] text-sm px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                          <Star className="fill-current" size={18} />
                          <span>{t('common.recommended')}</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#7A0B18] to-transparent p-4">
                          <p className="text-white font-bold text-lg text-center">{t('nav.orderNow')}</p>
                        </div>
                      </>
                    )}
                    {isJuice && (
                      <div className="absolute top-4 left-4 bg-[#EFBF3A] text-[#7A0B18] text-xs px-3 py-1 rounded-full font-bold">
                        {t('common.recommended')}
                      </div>
                    )}
                  </div>
                  
                  <div className={`${isPremium ? 'p-8' : 'p-6'}`}>
                    <h4 className={`font-serif ${isPremium ? 'text-3xl' : 'text-2xl'} text-[#7A0B18] mb-2`}>
                      {t(product.nameKey)}
                    </h4>
                    <p className={`text-[#6B4423] ${isPremium ? 'text-base' : 'text-sm'} mb-3`}>
                      {t(product.descriptionKey)}
                    </p>
                    {isPremium && (
                      <div className="mb-3 p-3 bg-[#4C8F3A]/10 rounded-lg border-l-4 border-[#4C8F3A]">
                        <p className="text-[#4C8F3A] font-bold text-sm flex items-center gap-2">
                          <Heart className="fill-current" size={16} />
                          <span>{t('common.recommended')}</span>
                        </p>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs text-[#8B8680]">
                      <span className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{t(product.seasonKey)}</span>
                      </span>
                      <span className="text-[#C4312E] font-medium hover:underline">{t('products.learn_more')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coming Soon Badge */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-[#EFBF3A] text-[#7A0B18] px-6 py-3 rounded-full font-bold text-lg shadow-lg">
              🍾 {t('products.vinegar')}
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default Product;