'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import AddToCartModal from './AddToCartModal';
import { products, getProductById } from '@/data/products';
import { Product } from '@/types/product';

// Mobile slideshow images
const images = [
  '/images2/viber_image_2025-10-08_20-47-50-758.jpg',
  '/images2/viber_image_2025-10-08_20-48-05-160.jpg',
  '/images2/viber_image_2025-10-08_20-48-05-466.jpg',
  '/images2/viber_image_2025-10-08_20-48-06-048.jpg',
  '/images2/viber_image_2025-10-08_20-48-06-306.jpg',
  '/images2/viber_image_2025-10-08_20-48-07-135.jpg',
  '/images2/viber_image_2025-10-08_20-48-08-204.jpg',
  '/images2/viber_image_2025-10-08_20-48-09-148.jpg',
  '/images2/viber_image_2025-10-08_21-15-26-512.jpg',
  '/images2/viber_image_2025-10-08_21-25-23-282.jpg'
];

// Desktop hero section images - all available images
const heroSectionImages = [
  '/hero-section-images/viber_image_2025-10-26_09-24-55-363.jpg',
  '/hero-section-images/viber_image_2025-10-26_09-25-00-329.jpg',
  '/hero-section-images/viber_image_2025-10-26_09-25-00-563.jpg',
  '/hero-section-images/viber_image_2025-10-26_09-25-00-800.jpg',
  '/hero-section-images/viber_image_2025-10-26_09-25-01-058.jpg',
  '/hero-section-images/viber_image_2025-10-26_09-25-01-283.jpg',
  '/hero-section-images/viber_image_2025-10-26_09-25-01-502.jpg',
  '/hero-section-images/viber_image_2025-10-26_09-25-01-705.jpg',
  '/hero-section-images/viber_image_2025-10-26_09-25-01-960.jpg'
];

// Global image cache to prevent repeated requests
const heroImageCache = new Map<string, HTMLImageElement>();

// Preload all hero images once when module loads
if (typeof window !== 'undefined') {
  const allHeroImages = [...images, ...heroSectionImages];
  allHeroImages.forEach((src) => {
    if (!heroImageCache.has(src)) {
      // Use window.Image to access native browser Image constructor (not Next.js Image component)
      const img = new window.Image();
      img.src = src;
      heroImageCache.set(src, img);
    }
  });
}

const Hero = () => {
  const { t } = useLanguage();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [leftColumnIndex, setLeftColumnIndex] = useState(0);
  const [rightColumnIndex, setRightColumnIndex] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imagesPreloadedRef = useRef(false);

  // Helper to get next index for preloading
  const getNextIndex = (current: number, total: number) => (current + 1) % total;
  const getPrevIndex = (current: number, total: number) => (current - 1 + total) % total;

  // Quick access products
  const quickAccessProducts = [
    'apples',
    'apple_juice',
    'potatoes',
    'cherries',
    'pears',
    'melons',
    'watermelons',
    'tomatoes',
    'quinces'
  ];

  // Preload all images on mount to ensure they're cached
  useEffect(() => {
    if (imagesPreloadedRef.current) return;
    imagesPreloadedRef.current = true;

    // Preload all images by creating Image objects - this ensures they're in browser cache
    const allImages = [...images, ...heroSectionImages];
    allImages.forEach((src) => {
      if (!heroImageCache.has(src)) {
        // Use window.Image to access native browser Image constructor (not Next.js Image component)
        const img = new window.Image();
        img.src = src;
        heroImageCache.set(src, img);
      }
    });
  }, []);

  useEffect(() => {
    setIsMounted(true);
    
    // Mobile slideshow interval (2 seconds)
    const mobileInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    // Left column interval (2.5 seconds for actual 1.5 sec visible time)
    const leftInterval = setInterval(() => {
      setLeftColumnIndex((prevIndex) => 
        prevIndex === heroSectionImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    // Right column interval (2.5 seconds for actual 1.5 sec visible time)
    const rightInterval = setInterval(() => {
      setRightColumnIndex((prevIndex) => 
        prevIndex === heroSectionImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => {
      clearInterval(mobileInterval);
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, []);

  const handleQuickBuy = (productId: string) => {
    const product = getProductById(productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section id="home" className="relative h-[97.5vh] flex items-center justify-center overflow-hidden pt-24 md:pt-20">
        {/* Desktop: 2-column layout with gradient overlay on each */}
        <div className="hidden md:flex absolute inset-0 w-full h-full">
          {/* Left Column */}
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7A0B18]/30 to-[#7A0B18]/60 z-10"></div>
            <div className="absolute inset-0">
              {/* Render all images - they all load into browser cache on mount, preventing future requests */}
              {heroSectionImages.map((src, imageIndex) => (
                <Image
                  key={imageIndex}
                  src={src}
                  alt={`Orchard ${imageIndex + 1}`}
                  fill
                  priority={imageIndex === 0}
                  quality={85}
                  sizes="50vw"
                  className={`object-cover transition-opacity duration-1000 ease-in-out pointer-events-none ${
                    imageIndex === leftColumnIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7A0B18]/30 to-[#7A0B18]/60 z-10"></div>
            <div className="absolute inset-0">
              {/* Render all images - they all load into browser cache on mount, preventing future requests */}
              {heroSectionImages.map((src, imageIndex) => (
                <Image
                  key={imageIndex}
                  src={src}
                  alt={`Orchard ${imageIndex + 1}`}
                  fill
                  priority={imageIndex === 1}
                  quality={85}
                  sizes="50vw"
                  className={`object-cover transition-opacity duration-1000 ease-in-out pointer-events-none ${
                    imageIndex === rightColumnIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Slideshow with gradient overlay */}
        <div className="md:hidden absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7A0B18]/30 to-[#7A0B18]/60 z-10"></div>
          {/* Render all images - they all load into browser cache on mount, preventing future requests */}
          {images.map((src, imageIndex) => (
            <Image
              key={imageIndex}
              src={src}
              alt={`Orchard ${imageIndex + 1}`}
              fill
              priority={imageIndex === 0}
              quality={85}
              sizes="100vw"
              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out pointer-events-none ${
                imageIndex === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        
        {/* Content: Logo + Quick Access Buttons */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          {/* Logo */}
          <div className="mb-2 md:mb-[-20px] relative z-30">
            <div className="w-32 h-32 md:w-36 md:h-36 relative">
              <Image
                src="/logo.svg"
                alt="Kasameri Logo"
                fill
                priority
                className="drop-shadow-2xl object-contain"
              />
            </div>
          </div>

          {/* Transparent Container with Quick-Access Buttons */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 w-full">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-4">
              {quickAccessProducts.map((productId) => {
                const product = getProductById(productId);
                if (!product) return null;

                // Map product IDs to image filenames
                const imageMap: Record<string, string> = {
                  'apples': 'florina.jpg',
                  'cherries': 'cherries.jpg',
                  'pears': 'pears.jpg',
                  'melons': 'melons.jpg',
                  'watermelons': 'watermelons.png',
                  'tomatoes': 'tomatoes.jpg',
                  'potatoes': 'potatoes.jpg',
                  'quinces': 'quinces.jpg',
                  'apple_juice': 'juice.jpg'
                };

                const imageName = imageMap[productId];

                const isOutOfStock = product.inStock === false;
                
                return (
                  <button
                    key={productId}
                    onClick={() => !isOutOfStock && handleQuickBuy(productId)}
                    disabled={isOutOfStock}
                    className={`flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/30 transition-all group ${
                      isOutOfStock 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-white/20 hover:border-white/50 transform hover:scale-105'
                    }`}
                  >
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2 rounded-lg overflow-hidden aspect-square">
                      <Image
                        src={`/quick-buttons/${imageName}`}
                        alt={t(product.nameKey)}
                        fill
                        quality={90}
                        sizes="(max-width: 768px) 80px, 96px"
                        priority={productId === 'apples' || productId === 'apple_juice'}
                        className={`${productId === 'apple_juice' ? 'object-contain' : 'object-cover'} group-hover:scale-110 transition-transform`}
                      />
                    </div>
                    <p className="text-white text-xs md:text-sm font-medium drop-shadow-lg text-center">
                      {t(product.nameKey)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Add to Cart Modal */}
      {selectedProduct && (
        <AddToCartModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default Hero;
