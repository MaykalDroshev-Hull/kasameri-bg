'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  
  // Selected diverse images from different time periods
  const images = [
    '/images/viber_image_2025-10-08_20-47-50-758.jpg',
    '/images/viber_image_2025-10-08_20-48-05-160.jpg',
    '/images/viber_image_2025-10-08_20-48-05-466.jpg',
    '/images/viber_image_2025-10-08_20-48-06-048.jpg',
    '/images/viber_image_2025-10-08_20-48-06-306.jpg',
    '/images/viber_image_2025-10-08_20-48-07-135.jpg',
    '/images/viber_image_2025-10-08_20-48-08-204.jpg',
    '/images/viber_image_2025-10-08_20-48-09-148.jpg',
    '/images/viber_image_2025-10-08_21-15-26-512.jpg',
    '/images/viber_image_2025-10-08_21-25-23-282.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7A0B18]/30 to-[#7A0B18]/60 z-10"></div>
      
      {/* Image slider container */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt={`Orchard ${index + 1}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-2xl">
            {t('hero.title')}
          </h1>
          <p className="text-white/90 text-base md:text-lg mb-0 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#products" className="bg-[#C4312E] text-white px-8 py-4 rounded-full hover:bg-[#A02820] transition transform hover:scale-105 font-medium shadow-xl">
            {t('hero.products_button')}
          </a>
          <a href="#distributors" className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#7A0B18] transition transform hover:scale-105 font-medium shadow-xl">
            {t('hero.distributors_button')}
          </a>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white" size={32} />
        </div>
      </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
