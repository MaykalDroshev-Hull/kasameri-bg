'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import AddToCartModal from './AddToCartModal';
import { products, getProductById } from '@/data/products';
import { Product } from '@/types/product';

const Hero = () => {
  const { t } = useLanguage();
  
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [leftColumnIndex, setLeftColumnIndex] = useState(0);
  const [rightColumnIndex, setRightColumnIndex] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Quick access products
  const quickAccessProducts = [
    'apples',
    'cherries',
    'pears',
    'melons',
    'tomatoes',
    'potatoes',
    'quinces',
    'apple_juice'
  ];

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
      <section id="home" className="relative h-[97.5vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Desktop: 2-column layout with gradient overlay on each */}
        <div className="hidden md:flex absolute inset-0 w-full h-full">
          {/* Left Column */}
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7A0B18]/30 to-[#7A0B18]/60 z-10"></div>
            <div className="absolute inset-0">
              {heroSectionImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Orchard ${index + 1}`}
                  fill
                  priority={index === 0}
                  quality={100}
                  sizes="50vw"
                  className={`object-cover transition-opacity duration-1000 ease-in-out ${
                    isMounted && index === leftColumnIndex ? 'opacity-100' : index === 0 && !isMounted ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7A0B18]/30 to-[#7A0B18]/60 z-10"></div>
            <div className="absolute inset-0">
              {heroSectionImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Orchard ${index + 1}`}
                  fill
                  priority={index === 1}
                  quality={100}
                  sizes="50vw"
                  className={`object-cover transition-opacity duration-1000 ease-in-out ${
                    isMounted && index === rightColumnIndex ? 'opacity-100' : index === 1 && !isMounted ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Slideshow with gradient overlay */}
        <div className="md:hidden absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7A0B18]/30 to-[#7A0B18]/60 z-10"></div>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Orchard ${index + 1}`}
              fill
              priority={index === 0}
              quality={100}
              sizes="100vw"
              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                isMounted && index === currentImageIndex ? 'opacity-100' : index === 0 ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        
        {/* Content: Logo + Quick Access Buttons */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          {/* Logo */}
          <div className="mb-2 md:mb-[-20px] relative z-30">
            <div className="w-24 h-24 md:w-36 md:h-36 relative">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {quickAccessProducts.map((productId) => {
                const product = getProductById(productId);
                if (!product) return null;

                // Map product IDs to image filenames
                const imageMap: Record<string, string> = {
                  'apples': 'apple.jpg',
                  'cherries': 'cherries.jpg',
                  'pears': 'pears.jpg',
                  'melons': 'melons.jpg',
                  'tomatoes': 'tomatoes.jpg',
                  'potatoes': 'potatoes.jpg',
                  'quinces': 'quinces.jpg',
                  'apple_juice': 'juice.jpg'
                };

                const imageName = imageMap[productId];

                return (
                  <button
                    key={productId}
                    onClick={() => handleQuickBuy(productId)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/30 hover:border-white/50 transition-all transform hover:scale-105 group"
                  >
                    <div className="relative w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 rounded-lg overflow-hidden">
                      <Image
                        src={`/quick-buttons/${imageName}`}
                        alt={t(product.nameKey)}
                        fill
                        quality={90}
                        sizes="64px"
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="text-white text-xs md:text-sm font-medium drop-shadow-lg">
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
