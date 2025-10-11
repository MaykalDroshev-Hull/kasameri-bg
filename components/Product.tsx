'use client';

import React, { useState } from 'react';
import { Calendar, Star, Heart } from 'lucide-react';

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
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);

  const products: ProductItem[] = [
    {
      id: 1,
      name: 'Ябълки',
      nameEn: 'Apples',
      category: 'ПЛОДОВЕ',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&h=600&fit=crop',
      description: 'Отглеждаме сортове Айдаред, Златна Превъзходна и Гренни Смит.',
      season: 'Септември - Ноември',
      featured: true
    },
    {
      id: 2,
      name: 'Череши',
      nameEn: 'Cherries',
      category: 'ПЛОДОВЕ',
      image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&h=600&fit=crop',
      description: 'Сладки и сочни череши, берени на ръка в пика на зрялост.',
      season: 'Юни - Юли',
      featured: true
    },
    {
      id: 3,
      name: 'Круши',
      nameEn: 'Pears',
      category: 'ПЛОДОВЕ',
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=600&fit=crop',
      description: 'Ароматни круши с перфектна текстура и естествена сладост.',
      season: 'Август - Октомври'
    },
    {
      id: 4,
      name: 'Пъпеши',
      nameEn: 'Melons',
      category: 'ПЛОДОВЕ',
      image: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=800&h=600&fit=crop',
      description: 'Сочни пъпеши, отгледани под слънцето на Ловешко.',
      season: 'Юли - Август'
    },
    {
      id: 5,
      name: 'Домати',
      nameEn: 'Tomatoes',
      category: 'ЗЕЛЕНЧУЦИ',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop',
      description: 'Пресни домати с богат вкус за салати и консерви.',
      season: 'Юни - Септември'
    },
    {
      id: 6,
      name: 'Картофи',
      nameEn: 'Potatoes',
      category: 'ЗЕЛЕНЧУЦИ',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&h=600&fit=crop',
      description: 'Качествени картофи, отгледани в плодородна почва.',
      season: 'Май - Октомври'
    },
    {
      id: 7,
      name: 'Дюли',
      nameEn: 'Quinces',
      category: 'ПЛОДОВЕ',
      image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=800&h=600&fit=crop',
      description: 'Ароматни дюли за сладка, конфитюр и традиционни рецепти.',
      season: 'Октомври - Ноември'
    },
    {
      id: 8,
      name: '100% Ябълков Сок',
      nameEn: 'Apple Juice',
      category: 'НАПИТКИ',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop',
      description: 'Натурален сок без добавена захар, консерванти или оцветители.',
      season: 'Целогодишно',
      featured: true
    }
  ];

  return (
    <section id="products" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-4">Нашите продукти</h2>
          <p className="text-[#6B4423] text-lg max-w-2xl mx-auto">
            От семето до масата - контролираме всеки етап за да гарантираме качество и вкус.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const isPremium = product.id === 1 || product.id === 2; // Apples and Cherries
            const isJuice = product.id === 8;
            
            return (
              <div 
                key={product.id}
                className={`
                  ${isPremium ? 'md:col-span-2 lg:col-span-1' : 'md:col-span-1'}
                  bg-[#FFF7ED] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer
                  ${isPremium ? 'ring-4 ring-[#EFBF3A] ring-offset-2' : ''}
                `}
                onClick={() => setActiveProduct(product)}
              >
                <div className={`relative ${isPremium ? 'h-80' : 'h-64'} overflow-hidden`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#4C8F3A] text-white text-xs px-3 py-1 rounded-full font-medium">
                    {product.category}
                  </div>
                  {isPremium && (
                    <>
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-[#EFBF3A] to-[#FFD15C] text-[#7A0B18] text-sm px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                        <Star className="fill-current" size={18} />
                        <span>ВИСОКА НАЛИЧНОСТ</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#7A0B18] to-transparent p-4">
                        <p className="text-white font-bold text-lg text-center">Поръчайте сега!</p>
                      </div>
                    </>
                  )}
                  {isJuice && (
                    <div className="absolute top-4 left-4 bg-[#EFBF3A] text-[#7A0B18] text-xs px-3 py-1 rounded-full font-bold">
                      ПРЕПОРЪЧАНО
                    </div>
                  )}
                </div>
                
                <div className={`${isPremium ? 'p-8' : 'p-6'}`}>
                  <h4 className={`font-serif ${isPremium ? 'text-3xl' : 'text-2xl'} text-[#7A0B18] mb-2`}>
                    {product.name}
                  </h4>
                  <p className={`text-[#6B4423] ${isPremium ? 'text-base' : 'text-sm'} mb-3`}>
                    {product.description}
                  </p>
                  {isPremium && (
                    <div className="mb-3 p-3 bg-[#4C8F3A]/10 rounded-lg border-l-4 border-[#4C8F3A]">
                      <p className="text-[#4C8F3A] font-bold text-sm flex items-center gap-2">
                        <Heart className="fill-current" size={16} />
                        <span>Основен продукт - винаги в наличност</span>
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-[#8B8680]">
                    <span className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{product.season}</span>
                    </span>
                    <span className="text-[#C4312E] font-medium hover:underline">Научи повече →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming Soon Badge */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-[#EFBF3A] text-[#7A0B18] px-6 py-3 rounded-full font-bold text-lg shadow-lg">
            🍾 Оцет - Скоро в продажба!
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
