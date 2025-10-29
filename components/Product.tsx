'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, ShoppingCart, Star, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product as ProductType } from '@/types/product';
import AddToCartModal from './AddToCartModal';
import CartDrawer from './CartDrawer';
import { products as realProducts } from '@/data/products';

interface ProductItem {
  id: number;
  name: string;
  nameEn: string;
  category: string;
  image: string;
  description: string;
  season: string;
  featured?: boolean;
}

const Product = () => {
  const [activeProduct, setActiveProduct] = useState<ProductType | null>(null);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const { t, language } = useLanguage();

  const products: ProductItem[] = [
    {
      id: 1,
      name: t('products.apples'),
      nameEn: 'Apples',
      category: t('products.fruits'),
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&h=600&fit=crop',
      description: t('products.apples_desc'),
      season: t('products.apples_season'),
      featured: true
    },
    {
      id: 2,
      name: t('products.cherries'),
      nameEn: 'Cherries',
      category: t('products.fruits'),
      image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&h=600&fit=crop',
      description: t('products.cherries_desc'),
      season: t('products.cherries_season'),
      featured: true
    },
    {
      id: 3,
      name: t('products.pears'),
      nameEn: 'Pears',
      category: t('products.fruits'),
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=600&fit=crop',
      description: t('products.pears_desc'),
      season: t('products.pears_season')
    },
    {
      id: 4,
      name: t('products.melons'),
      nameEn: 'Melons',
      category: t('products.fruits'),
      image: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=800&h=600&fit=crop',
      description: t('products.melons_desc'),
      season: t('products.melons_season')
    },
    {
      id: 5,
      name: t('products.tomatoes'),
      nameEn: 'Tomatoes',
      category: t('products.vegetables'),
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop',
      description: t('products.tomatoes_desc'),
      season: t('products.tomatoes_season')
    },
    {
      id: 6,
      name: t('products.potatoes'),
      nameEn: 'Potatoes',
      category: t('products.vegetables'),
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&h=600&fit=crop',
      description: t('products.potatoes_desc'),
      season: t('products.potatoes_season')
    },
    {
      id: 7,
      name: t('products.quinces'),
      nameEn: 'Quinces',
      category: t('products.fruits'),
      image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=800&h=600&fit=crop',
      description: t('products.quinces_desc'),
      season: t('products.quinces_season')
    },
    {
      id: 8,
      name: t('products.juice'),
      nameEn: 'Apple Juice',
      category: t('products.drinks'),
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop',
      description: t('products.juice_desc'),
      season: t('products.juice_season'),
      featured: true
    }
  ];

  const handleBuyClick = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation(); // Prevent card click
    setActiveProduct(product);
    setShowAddToCartModal(true);
  };
  
  const handleAddToCartClose = () => {
    setShowAddToCartModal(false);
    setActiveProduct(null);
  };

  const handleCardClick = (product: ProductType) => {
    // Open buy modal directly
    handleBuyClick(new Event('click') as any, product);
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

  // Determine premium/featured products
  const isPremiumProduct = (product: ProductType) => {
    return product.premium === true;
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
            {realProducts.map((product) => {
              const isPremium = isPremiumProduct(product);
              const isJuice = product.featured === true;
              
              return (
                <div 
                  key={product.id}
                  className={`
                    ${isPremium ? 'md:col-span-2 lg:col-span-1' : 'md:col-span-1'}
                    bg-[#FFF7ED] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col
                    ${isPremium ? 'ring-4 ring-[#EFBF3A] ring-offset-2' : ''}
                  `}
                  onClick={() => handleCardClick(product)}
                >
                  <div className={`relative ${isPremium ? 'h-80' : 'h-64'} overflow-hidden flex-shrink-0`}>
                    <Image
                      src={product.imageUrl}
                      alt={t(product.nameKey)}
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[#4C8F3A] text-white text-xs px-3 py-1 rounded-full font-medium">
                      {getCategoryLabel(product.category)}
                    </div>
                    {isPremium && (
                      <>
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-[#EFBF3A] to-[#FFD15C] text-[#7A0B18] text-sm px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                          <Star className="fill-current" size={18} />
                          <span>{t('badges.highAvailability')}</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#7A0B18] to-transparent p-4">
                          <p className="text-white font-bold text-lg text-center">{t('badges.orderNow')}</p>
                        </div>
                      </>
                    )}
                    {isJuice && (
                      <div className="absolute top-4 left-4 bg-[#EFBF3A] text-[#7A0B18] text-xs px-3 py-1 rounded-full font-bold">
                        {t('badges.recommended')}
                      </div>
                    )}
                  </div>
                  
                  <div className={`${isPremium ? 'p-8' : 'p-6'} flex flex-col flex-1`}>
                    <div className="flex-1">
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
                            <span>{t('badges.coreProduct')}</span>
                          </p>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs text-[#8B8680] mb-3">
                        <span className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{t(product.seasonKey)}</span>
                        </span>
                        <span className="text-[#C4312E] font-medium hover:underline">{t('badges.learnMore')}</span>
                      </div>
                    </div>
                    
                    {/* Buy Button - Always at bottom */}
                    <button
                      onClick={(e) => handleBuyClick(e, product)}
                      className="w-full mt-4 px-4 py-3 bg-[#C4312E] text-white rounded-lg hover:bg-[#A02820] transition flex items-center justify-center space-x-2 font-medium"
                    >
                      <ShoppingCart size={16} />
                      <span>{t('common.buy')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
            
            {/* Coming Soon - Vinegar Card */}
            <div className="bg-[#FFF7ED] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col opacity-75">
              <div className="relative h-64 overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#EFBF3A] to-[#FFD15C]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🍾</div>
                    <div className="bg-[#7A0B18] text-white text-sm px-4 py-2 rounded-full font-bold">
                      {t('badges.comingSoon')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  <h4 className="font-serif text-2xl text-[#7A0B18] mb-2">
                    Оцет
                  </h4>
                  <p className="text-[#6B4423] text-sm mb-3">
                    Скоро в продажба!
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#8B8680] mb-3">
                    <span className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>Очаквайте скоро</span>
                    </span>
                  </div>
                </div>
                
                {/* Disabled Button */}
                <button
                  disabled
                  className="w-full mt-4 px-4 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed flex items-center justify-center space-x-2 font-medium"
                >
                  <ShoppingCart size={16} />
                  <span>Скоро</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add to Cart Modal */}
      {activeProduct && (
        <AddToCartModal
          isOpen={showAddToCartModal}
          onClose={handleAddToCartClose}
          product={activeProduct}
        />
      )}
      
      {/* Cart Drawer */}
      <CartDrawer
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
      />
    </>
  );
};

export default Product;