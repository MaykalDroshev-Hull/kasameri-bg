'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

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
      season: 'Септември - Ноември'
    },
    {
      id: 2,
      name: 'Череши',
      nameEn: 'Cherries',
      category: 'ПЛОДОВЕ',
      image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&h=600&fit=crop',
      description: 'Сладки и сочни череши, берени на ръка в пика на зрялост.',
      season: 'Юни - Юли'
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
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-[#FFF7ED] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => setActiveProduct(product)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-[#4C8F3A] text-white text-xs px-3 py-1 rounded-full font-medium">
                  {product.category}
                </div>
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-[#EFBF3A] text-[#7A0B18] text-xs px-3 py-1 rounded-full font-bold">
                    ПРЕПОРЪЧАНО
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h4 className="font-serif text-2xl text-[#7A0B18] mb-2">{product.name}</h4>
                <p className="text-[#6B4423] text-sm mb-3">{product.description}</p>
                <div className="flex items-center justify-between text-xs text-[#8B8680]">
                  <span className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{product.season}</span>
                  </span>
                  <span className="text-[#C4312E] font-medium hover:underline">Научи повече →</span>
                </div>
              </div>
            </div>
          ))}
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
