'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Make images visible immediately on mount to prevent white space
    setMounted(true);
  }, []);

  useEffect(() => {
    // Intersection Observer for entrance animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleImages((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const imageElements = document.querySelectorAll('.gallery-image');
    imageElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      imageElements.forEach((el) => {
        observerRef.current?.unobserve(el);
      });
    };
  }, [mounted]);
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#FFF7ED] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="text-[#C4312E] fill-current" size={36} />
            <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18]">{t('gallery.title')}</h2>
            <Heart className="text-[#C4312E] fill-current" size={36} />
          </div>
          <p className="text-[#6B4423] text-lg">{t('gallery.subtitle')}</p>
        </div>

        {/* Asymmetric Grid Layout - Mobile */}
        <div className="grid grid-cols-2 gap-0 md:hidden">
          <div 
            id="gallery-mobile-1"
            className={`gallery-image relative overflow-hidden group cursor-pointer h-48 transition-all duration-500 ease-out ${
              mounted && visibleImages.has('gallery-mobile-1') ? 'opacity-100' : 'opacity-80'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <Image 
              src="/images/viber_image_2025-10-08_21-16-57-793.jpg"
              alt="Нашите градини"
              fill
              sizes="(max-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">{t('gallery.caption.ourGardens')}</p>
            </div>
          </div>

          <div 
            id="gallery-mobile-2"
            className={`gallery-image relative overflow-hidden group cursor-pointer h-64 row-span-2 transition-all duration-500 ease-out ${
              mounted && visibleImages.has('gallery-mobile-2') ? 'opacity-100' : 'opacity-80'
            }`}
            style={{ transitionDelay: '50ms' }}
          >
            <Image 
              src="/images/viber_image_2025-10-08_21-25-57-719.jpg"
              alt="Жътва"
              fill
              sizes="(max-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">{t('gallery.caption.harvest')}</p>
            </div>
          </div>

          <div 
            id="gallery-mobile-3"
            className={`gallery-image relative overflow-hidden group cursor-pointer h-40 transition-all duration-500 ease-out ${
              mounted && visibleImages.has('gallery-mobile-3') ? 'opacity-100' : 'opacity-80'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <Image 
              src="/images/viber_image_2025-10-08_21-55-41-249.jpg"
              alt="Сок"
              fill
              sizes="(max-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">{t('gallery.caption.naturalJuice')}</p>
            </div>
          </div>

          <div 
            id="gallery-mobile-4"
            className={`gallery-image col-span-2 relative overflow-hidden group cursor-pointer h-52 transition-all duration-500 ease-out ${
              mounted && visibleImages.has('gallery-mobile-4') ? 'opacity-100' : 'opacity-80'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <Image 
              src="/images/viber_image_2025-10-08_20-48-08-928.jpg"
              alt="Производство"
              fill
              sizes="(max-width: 768px) 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-serif text-lg">{t('gallery.caption.product')}</p>
            </div>
          </div>

          <div 
            id="gallery-mobile-5"
            className={`gallery-image relative overflow-hidden group cursor-pointer h-48 transition-all duration-500 ease-out ${
              mounted && visibleImages.has('gallery-mobile-5') ? 'opacity-100' : 'opacity-80'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <Image 
              src="/images/viber_image_2025-10-08_21-16-58-106.jpg"
              alt="Опаковане"
              fill
              sizes="(max-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">{t('gallery.caption.packaging')}</p>
            </div>
          </div>

          <div 
            id="gallery-mobile-6"
            className={`gallery-image relative overflow-hidden group cursor-pointer h-48 transition-all duration-500 ease-out ${
              mounted && visibleImages.has('gallery-mobile-6') ? 'opacity-100' : 'opacity-80'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            <Image 
              src="/images/viber_image_2025-10-08_21-25-56-788.jpg"
              alt="Екип"
              fill
              sizes="(max-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">{t('gallery.caption.team')}</p>
            </div>
          </div>
        </div>

        {/* Asymmetric Grid Layout - Desktop */}
        <div className="hidden md:grid grid-cols-6 gap-0 auto-rows-auto" style={{ gridAutoFlow: 'dense' }}>
          {/* Row 1 - 6 columns total */}
          <div 
            id="gallery-desktop-1"
            className={`gallery-image col-span-2 relative overflow-hidden group cursor-pointer aspect-square transition-all duration-500 ease-out ${
              mounted && visibleImages.has('gallery-desktop-1') ? 'opacity-100' : 'opacity-80'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <Image 
              src="/images/viber_image_2025-10-08_21-16-57-793.jpg"
              alt="Нашите градини"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">{t('gallery.caption.ourGardens')}</p>
            </div>
          </div>

          <div 
            id="gallery-desktop-2"
            className={`gallery-image col-span-2 relative overflow-hidden group cursor-pointer aspect-[4/3] transition-all duration-500 ease-out ${
              mounted && visibleImages.has('gallery-desktop-2') ? 'opacity-100' : 'opacity-80'
            }`}
            style={{ transitionDelay: '50ms' }}
          >
            <Image 
              src="/images/viber_image_2025-10-08_21-55-41-249.jpg"
              alt="Чист натурален сок"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">{t('gallery.caption.naturalJuice')}</p>
            </div>
          </div>

          <div 
            id="gallery-desktop-3"
            className={`gallery-image col-span-2 relative overflow-hidden group cursor-pointer aspect-[3/4] transition-all duration-500 ease-out ${
              mounted && visibleImages.has('gallery-desktop-3') ? 'opacity-100' : 'opacity-80'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <Image 
              src="/images/viber_image_2025-10-08_21-25-57-719.jpg"
              alt="Жътва с грижа"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-2xl">{t('gallery.caption.harvestWithCare')}</p>
            </div>
          </div>

          {/* Row 2 */}
          <div 
            id="gallery-desktop-4"
            className={`gallery-image col-span-2 relative overflow-hidden group cursor-pointer aspect-[4/3] transition-all duration-500 ease-out ${
              mounted && visibleImages.has('gallery-desktop-4') ? 'opacity-100' : 'opacity-80'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <Image 
              src="/images/viber_image_2025-10-08_21-16-58-106.jpg"
              alt="Опаковане"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">{t('gallery.caption.packaging')}</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="col-span-2 relative overflow-hidden group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_20-48-08-928.jpg"
              alt="Модерни технологии"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">{t('gallery.caption.modernTech')}</p>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden group cursor-pointer aspect-[3/4]">
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

          <div className="col-span-1 relative overflow-hidden group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_21-55-41-328.jpg"
              alt="Готов продукт"
              fill
              sizes="(min-width: 768px) 17vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-sm">{t('gallery.caption.product')}</p>
            </div>
          </div>

          {/* Row 4 */}
          <div className="col-span-3 relative overflow-hidden group cursor-pointer aspect-[16/9]">
            <Image 
              src="/images/viber_image_2025-10-08_21-25-56-040.jpg"
              alt="Контрол на качеството"
              fill
              sizes="(min-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">{t('gallery.caption.qualityControl')}</p>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_20-48-07-679.jpg"
              alt="Плодове"
              fill
              sizes="(min-width: 768px) 17vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-sm">{t('gallery.caption.fruits')}</p>
            </div>
          </div>

          <div className="col-span-2 relative overflow-hidden group cursor-pointer aspect-[4/3]">
            <Image 
              src="/images/viber_image_2025-10-08_21-16-57-526.jpg"
              alt="Традиция"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">{t('gallery.caption.tradition')}</p>
            </div>
          </div>

          {/* Row 5 */}
          <div className="col-span-1 relative overflow-hidden group cursor-pointer aspect-[3/4]">
            <Image 
              src="/images/viber_image_2025-10-08_21-16-58-267.jpg"
              alt="Пресни ябълки"
              fill
              sizes="(min-width: 768px) 17vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white text-sm">{t('gallery.caption.apples')}</p>
            </div>
          </div>

          <div className="col-span-2 relative overflow-hidden group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_21-25-55-519.jpg"
              alt="В градината"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">{t('gallery.caption.inGarden')}</p>
            </div>
          </div>

          {/* Row 6 */}
          <div className="col-span-2 relative overflow-hidden group cursor-pointer aspect-[4/3]">
            <Image 
              src="/images/viber_image_2025-10-08_21-55-40-988.jpg"
              alt="Сортиране"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">{t('gallery.caption.sorting')}</p>
            </div>
          </div>

          <div className="col-span-3 relative overflow-hidden group cursor-pointer aspect-[16/9]">
            <Image 
              src="/images/viber_image_2025-10-08_20-48-06-556.jpg"
              alt="Работа в градината"
              fill
              sizes="(min-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">{t('gallery.caption.workWithCare')}</p>
            </div>
          </div>

          {/* Row 7 */}
          <div className="col-span-2 relative overflow-hidden group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_21-39-22-222.jpg"
              alt="Прясна реколта"
              fill
              sizes="(min-width: 768px) 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">{t('gallery.caption.freshHarvest')}</p>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_21-25-57-328.jpg"
              alt="Качество"
              fill
              sizes="(min-width: 768px) 17vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-sm">{t('gallery.caption.quality')}</p>
            </div>
          </div>

          {/* Row 8 */}
          <div className="col-span-3 relative overflow-hidden group cursor-pointer aspect-[16/9]">
            <Image 
              src="/images/viber_image_2025-10-08_20-48-09-394.jpg"
              alt="Нашата страст"
              fill
              sizes="(min-width: 768px) 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-serif text-xl">{t('gallery.caption.ourPassion')}</p>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden group cursor-pointer aspect-square">
            <Image 
              src="/images/viber_image_2025-10-08_21-55-41-454.jpg"
              alt="От сърце"
              fill
              sizes="(min-width: 768px) 17vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-sm">{t('gallery.caption.fromHeart')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;


