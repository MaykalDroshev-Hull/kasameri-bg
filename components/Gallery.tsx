'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  return (
    <section className="py-20 px-4 bg-[#FFF7ED]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-4">{t('gallery.title')}</h2>
          <p className="text-[#6B4423] text-lg">{t('gallery.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=800&fit=crop" 
              alt="Orchard"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-2xl">Нашите овощни градини</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-48">
            <img 
              src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=400&fit=crop" 
              alt="Harvest"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Жътва</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-48">
            <img 
              src="https://images.unsplash.com/photo-1587049352846-4a222e784422?w=400&h=400&fit=crop" 
              alt="Juice"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Сок</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-48">
            <img 
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop" 
              alt="Processing"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Производство</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-48">
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop" 
              alt="Packaging"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Опаковане</p>
            </div>
          </div>

          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-48">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop" 
              alt="Team"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">Нашият екип</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-48">
            <img 
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop" 
              alt="Quality"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Контрол</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;


