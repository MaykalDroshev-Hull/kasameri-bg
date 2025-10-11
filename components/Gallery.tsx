'use client';

import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

const Gallery = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#FFF7ED] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="text-[#C4312E] fill-current" size={36} />
            <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18]">Нашата история в снимки</h2>
            <Heart className="text-[#C4312E] fill-current" size={36} />
          </div>
          <p className="text-[#6B4423] text-lg">Моменти, които разказват нашата страст и грижа</p>
        </div>

        {/* Asymmetric Grid Layout - Mobile */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-48">
            <Image 
              src="/images/viber_image_2025-10-08_21-16-57-793.jpg"
              alt="Нашите градини"
              fill
              sizes="(max-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Градините</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-64 row-span-2">
            <Image 
              src="/images/viber_image_2025-10-08_21-25-57-719.jpg"
              alt="Жътва"
              fill
              sizes="(max-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Жътва</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-40">
            <Image 
              src="/images/viber_image_2025-10-08_21-55-41-249.jpg"
              alt="Сок"
              fill
              sizes="(max-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Сок</p>
            </div>
          </div>

          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-52">
            <Image 
              src="/images/viber_image_2025-10-08_20-48-08-928.jpg"
              alt="Производство"
              fill
              sizes="(max-width: 768px) 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-serif text-lg">Производство</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-48">
            <Image 
              src="/images/viber_image_2025-10-08_21-16-58-106.jpg"
              alt="Опаковане"
              fill
              sizes="(max-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Опаковане</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer h-48">
            <Image 
              src="/images/viber_image_2025-10-08_21-25-56-788.jpg"
              alt="Екип"
              fill
              sizes="(max-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Екипът</p>
            </div>
          </div>
        </div>

        {/* Asymmetric Grid Layout - Desktop */}
        <div className="hidden md:grid grid-cols-6 gap-2 auto-rows-auto" style={{ gridAutoFlow: 'dense' }}>
          {/* Row 1 - 6 columns total */}
          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_21-16-57-793.jpg"
              alt="Нашите градини"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">Нашите градини</p>
            </div>
          </div>

          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-[4/3]">
            <Image 
              src="/images/viber_image_2025-10-08_21-55-41-249.jpg"
              alt="Чист натурален сок"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Натурален сок</p>
            </div>
          </div>

          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-[3/4]">
            <Image 
              src="/images/viber_image_2025-10-08_21-25-57-719.jpg"
              alt="Жътва с грижа"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-2xl">Жътва с грижа</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-[4/3]">
            <Image 
              src="/images/viber_image_2025-10-08_21-16-58-106.jpg"
              alt="Опаковане"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Опаковане</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_20-48-08-928.jpg"
              alt="Модерни технологии"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">Модерни технологии</p>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-[3/4]">
            <Image 
              src="/images/viber_image_2025-10-08_21-25-56-788.jpg"
              alt="Нашият екип"
              fill
              sizes="(min-width: 768px) 17vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white text-sm font-medium">Екипът</p>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_21-55-41-328.jpg"
              alt="Готов продукт"
              fill
              sizes="(min-width: 768px) 17vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-sm">Продукт</p>
            </div>
          </div>

          {/* Row 4 */}
          <div className="col-span-3 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-[16/9]">
            <Image 
              src="/images/viber_image_2025-10-08_21-25-56-040.jpg"
              alt="Контрол на качеството"
              fill
              sizes="(min-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">Контрол на качеството</p>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_20-48-07-679.jpg"
              alt="Плодове"
              fill
              sizes="(min-width: 768px) 17vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-sm">Плодове</p>
            </div>
          </div>

          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-[4/3]">
            <Image 
              src="/images/viber_image_2025-10-08_21-16-57-526.jpg"
              alt="Традиция"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Традиция</p>
            </div>
          </div>

          {/* Row 5 */}
          <div className="col-span-1 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-[3/4]">
            <Image 
              src="/images/viber_image_2025-10-08_21-16-58-267.jpg"
              alt="Пресни ябълки"
              fill
              sizes="(min-width: 768px) 17vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white text-sm">Ябълки</p>
            </div>
          </div>

          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_21-25-55-519.jpg"
              alt="В градината"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">В градината</p>
            </div>
          </div>

          {/* Row 6 */}
          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-[4/3]">
            <Image 
              src="/images/viber_image_2025-10-08_21-55-40-988.jpg"
              alt="Сортиране"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">Сортиране</p>
            </div>
          </div>

          <div className="col-span-3 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-[16/9]">
            <Image 
              src="/images/viber_image_2025-10-08_20-48-06-556.jpg"
              alt="Работа в градината"
              fill
              sizes="(min-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">Работа с грижа</p>
            </div>
          </div>

          {/* Row 7 */}
          <div className="col-span-2 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_21-39-22-222.jpg"
              alt="Прясна реколта"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">Прясна реколта</p>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_21-25-57-328.jpg"
              alt="Качество"
              fill
              sizes="(min-width: 768px) 17vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-sm">Качество</p>
            </div>
          </div>

          {/* Row 8 */}
          <div className="col-span-3 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-[16/9]">
            <Image 
              src="/images/viber_image_2025-10-08_20-48-09-394.jpg"
              alt="Нашата страст"
              fill
              sizes="(min-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">Нашата страст</p>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_21-55-41-454.jpg"
              alt="От сърце"
              fill
              sizes="(min-width: 768px) 17vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-sm">От сърце</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

