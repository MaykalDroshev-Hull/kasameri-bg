'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProcessStep {
  number: string;
  emoji: string;
  title: string;
  desc: string;
  details: string;
}

const Process = () => {
  const { t } = useLanguage();
  
  // Images for the "Our Orchards" step
  const orchardImages = [
    '/our-gardens/viber_image_2025-10-26_10-51-05-312.jpg',
    '/our-gardens/viber_image_2025-10-26_10-51-17-814.jpg',
    '/our-gardens/viber_image_2025-10-26_10-51-27-262.jpg',
    '/our-gardens/viber_image_2025-10-26_10-51-27-492.jpg',
    '/our-gardens/viber_image_2025-10-26_10-51-27-712.jpg',
    '/our-gardens/viber_image_2025-10-26_10-51-27-921.jpg',
    '/our-gardens/viber_image_2025-10-26_10-51-28-142.jpg',
    '/our-gardens/viber_image_2025-10-26_10-51-28-371.jpg',
    '/our-gardens/viber_image_2025-10-26_10-51-28-603.jpg',
    '/our-gardens/viber_image_2025-10-26_10-51-28-887.jpg',
    '/our-gardens/viber_image_2025-10-26_10-51-29-121.jpg'
  ];

  // Images for the "Hand Picking" step
  const handPickingImages = [
    '/hand-picking/viber_image_2025-10-26_10-51-29-121.jpg',
    '/hand-picking/viber_image_2025-10-26_10-53-40-899.jpg',
    '/hand-picking/viber_image_2025-10-26_10-53-59-151.jpg',
    '/hand-picking/viber_image_2025-10-26_10-53-59-688.jpg',
    '/hand-picking/viber_image_2025-10-26_10-53-59-917.jpg',
    '/hand-picking/viber_image_2025-10-26_10-54-00-199.jpg',
    '/hand-picking/viber_image_2025-10-26_10-54-00-423.jpg',
    '/hand-picking/viber_image_2025-10-26_10-54-00-665.jpg',
    '/hand-picking/viber_image_2025-10-26_10-54-00-905.jpg',
    '/hand-picking/viber_image_2025-10-26_10-54-01-123.jpg',
    '/hand-picking/viber_image_2025-10-26_10-54-01-348.jpg',
    '/hand-picking/viber_image_2025-10-26_10-54-01-584.jpg',
    '/hand-picking/viber_image_2025-10-26_10-54-01-835.jpg',
    '/hand-picking/viber_image_2025-10-26_10-54-02-066.jpg',
    '/hand-picking/viber_image_2025-10-26_10-54-02-300.jpg'
  ];

  // Images for the "Modern Machinery" step
  const machineryImages = [
    '/modern-machines/viber_image_2025-10-26_10-54-26-809.jpg',
    '/modern-machines/viber_image_2025-10-26_10-54-30-195.jpg',
    '/modern-machines/viber_image_2025-10-26_10-54-30-440.jpg',
    '/modern-machines/viber_image_2025-10-26_10-54-30-689.jpg',
    '/modern-machines/viber_image_2025-10-26_10-54-30-895.jpg',
    '/modern-machines/viber_image_2025-10-26_10-54-31-103.jpg',
    '/modern-machines/viber_image_2025-10-26_10-54-31-362.jpg',
    '/modern-machines/viber_image_2025-10-26_10-54-31-594.jpg'
  ];

  // Images for the "Love for the Process" step
  const loveProcessImages = [
    '/love-to-the-process/viber_image_2025-10-26_11-16-54-615.jpg',
    '/love-to-the-process/viber_image_2025-10-26_11-16-54-863.jpg',
    '/love-to-the-process/viber_image_2025-10-26_11-16-55-082.jpg',
    '/love-to-the-process/viber_image_2025-10-26_11-16-55-399.jpg',
    '/love-to-the-process/viber_image_2025-10-26_11-16-55-733.jpg',
    '/love-to-the-process/viber_image_2025-10-26_11-16-56-122.jpg',
    '/love-to-the-process/viber_image_2025-10-26_11-16-56-366.jpg',
    '/love-to-the-process/viber_image_2025-10-26_11-16-56-590.jpg'
  ];

  // Images for the "Quality Control" step
  const qualityControlImages = [
    '/quality-control/viber_image_2025-10-26_10-55-29-411.jpg',
    '/quality-control/viber_image_2025-10-26_11-16-54-863.jpg'
  ];

  const [currentOrchardImageIndex, setCurrentOrchardImageIndex] = useState(0);
  const [currentHandPickingImageIndex, setCurrentHandPickingImageIndex] = useState(0);
  const [currentMachineryImageIndex, setCurrentMachineryImageIndex] = useState(0);
  const [currentLoveProcessImageIndex, setCurrentLoveProcessImageIndex] = useState(0);
  const [currentQualityControlImageIndex, setCurrentQualityControlImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Interval for orchard images
    const orchardInterval = setInterval(() => {
      setCurrentOrchardImageIndex((prevIndex) => 
        prevIndex === orchardImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    // Interval for hand picking images
    const handPickingInterval = setInterval(() => {
      setCurrentHandPickingImageIndex((prevIndex) => 
        prevIndex === handPickingImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    // Interval for machinery images
    const machineryInterval = setInterval(() => {
      setCurrentMachineryImageIndex((prevIndex) => 
        prevIndex === machineryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    // Interval for love process images
    const loveProcessInterval = setInterval(() => {
      setCurrentLoveProcessImageIndex((prevIndex) => 
        prevIndex === loveProcessImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    // Interval for quality control images
    const qualityControlInterval = setInterval(() => {
      setCurrentQualityControlImageIndex((prevIndex) => 
        prevIndex === qualityControlImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 2 seconds

    return () => {
      clearInterval(orchardInterval);
      clearInterval(handPickingInterval);
      clearInterval(machineryInterval);
      clearInterval(loveProcessInterval);
      clearInterval(qualityControlInterval);
    };
  }, []);
  
  const processSteps: ProcessStep[] = [
    { 
      number: '01', 
      emoji: '🌳',
      title: t('process.step1.title'), 
      desc: t('process.step1.desc'),
      details: t('process.step1.details')
    },
    { 
      number: '02', 
      emoji: '👐',
      title: t('process.step2.title'), 
      desc: t('process.step2.desc'),
      details: t('process.step2.details')
    },
    { 
      number: '03', 
      emoji: '⚙️',
      title: t('process.step3.title'), 
      desc: t('process.step3.desc'),
      details: t('process.step3.details')
    },
    { 
      number: '04', 
      emoji: '🔬',
      title: t('process.step4.title'), 
      desc: t('process.step4.desc'),
      details: t('process.step4.details')
    },
    { 
      number: '05', 
      emoji: '❤️',
      title: t('process.step5.title'), 
      desc: t('process.step5.desc'),
      details: t('process.step5.details')
    }
  ];

  return (
    <section id="process" className="py-20 px-4 bg-gradient-to-b from-white to-[#FFF7ED]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#4C8F3A] text-sm font-bold tracking-wider mb-3">{t('process.sectionTitle')}</div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-4">{t('process.heading')}</h2>
          <p className="text-[#6B4423] text-lg max-w-2xl mx-auto">
            {t('process.intro')}
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {processSteps.map((step, index) => (
            <div key={index}>
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                {/* Image Section - Show actual images for steps with images */}
                <div className="w-full md:w-1/2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7A0B18]/20 to-[#4C8F3A]/20 rounded-3xl transform group-hover:scale-105 transition-transform duration-300"></div>
                    {step.number === '01' ? (
                      // Show rotating orchard images for "Our Orchards" step
                      <div className="relative bg-gradient-to-br from-[#FFF7ED] to-[#FFE4CC] rounded-3xl h-[300px] border-4 border-white shadow-xl overflow-hidden">
                        <div className="relative w-full h-full">
                          {/* Only render current and next images for smooth transitions */}
                          {[currentOrchardImageIndex, (currentOrchardImageIndex + 1) % orchardImages.length].map((imageIndex) => (
                            <Image
                              key={imageIndex}
                              src={orchardImages[imageIndex]}
                              alt={`Orchard ${imageIndex + 1}`}
                              fill
                              priority={false}
                              loading="lazy"
                              quality={85}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                                imageIndex === currentOrchardImageIndex ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          ))}
                          {/* Overlay with step number */}
                          <div className="absolute bottom-4 right-4 bg-[#7A0B18]/80 text-white text-4xl font-serif px-4 py-2 rounded-full">
                            {step.number}
                          </div>
                        </div>
                      </div>
                    ) : step.number === '02' ? (
                      // Show rotating hand picking images for "Hand Picking" step
                      <div className="relative bg-gradient-to-br from-[#FFF7ED] to-[#FFE4CC] rounded-3xl h-[300px] border-4 border-white shadow-xl overflow-hidden">
                        <div className="relative w-full h-full">
                          {/* Only render current and next images for smooth transitions */}
                          {[currentHandPickingImageIndex, (currentHandPickingImageIndex + 1) % handPickingImages.length].map((imageIndex) => (
                            <Image
                              key={imageIndex}
                              src={handPickingImages[imageIndex]}
                              alt={`Hand Picking ${imageIndex + 1}`}
                              fill
                              priority={false}
                              loading="lazy"
                              quality={85}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                                imageIndex === currentHandPickingImageIndex ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          ))}
                          {/* Overlay with step number */}
                          <div className="absolute bottom-4 right-4 bg-[#7A0B18]/80 text-white text-4xl font-serif px-4 py-2 rounded-full">
                            {step.number}
                          </div>
                        </div>
                      </div>
                    ) : step.number === '03' ? (
                      // Show rotating machinery images for "Modern Machinery" step
                      <div className="relative bg-gradient-to-br from-[#FFF7ED] to-[#FFE4CC] rounded-3xl h-[300px] border-4 border-white shadow-xl overflow-hidden">
                        <div className="relative w-full h-full">
                          {/* Only render current and next images for smooth transitions */}
                          {[currentMachineryImageIndex, (currentMachineryImageIndex + 1) % machineryImages.length].map((imageIndex) => (
                            <Image
                              key={imageIndex}
                              src={machineryImages[imageIndex]}
                              alt={`Modern Machinery ${imageIndex + 1}`}
                              fill
                              priority={false}
                              loading="lazy"
                              quality={85}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                                imageIndex === currentMachineryImageIndex ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          ))}
                          {/* Overlay with step number */}
                          <div className="absolute bottom-4 right-4 bg-[#7A0B18]/80 text-white text-4xl font-serif px-4 py-2 rounded-full">
                            {step.number}
                          </div>
                        </div>
                      </div>
                    ) : step.number === '05' ? (
                      // Show rotating love process images for "Love for the Process" step
                      <div className="relative bg-gradient-to-br from-[#FFF7ED] to-[#FFE4CC] rounded-3xl h-[300px] border-4 border-white shadow-xl overflow-hidden">
                        <div className="relative w-full h-full">
                          {/* Only render current and next images for smooth transitions */}
                          {[currentLoveProcessImageIndex, (currentLoveProcessImageIndex + 1) % loveProcessImages.length].map((imageIndex) => (
                            <Image
                              key={imageIndex}
                              src={loveProcessImages[imageIndex]}
                              alt={`Love for the Process ${imageIndex + 1}`}
                              fill
                              priority={false}
                              loading="lazy"
                              quality={85}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                                imageIndex === currentLoveProcessImageIndex ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          ))}
                          {/* Overlay with step number */}
                          <div className="absolute bottom-4 right-4 bg-[#7A0B18]/80 text-white text-4xl font-serif px-4 py-2 rounded-full">
                            {step.number}
                          </div>
                        </div>
                      </div>
                    ) : step.number === '04' ? (
                      // Show rotating quality control images for "Quality Control" step
                      <div className="relative bg-gradient-to-br from-[#FFF7ED] to-[#FFE4CC] rounded-3xl h-[300px] border-4 border-white shadow-xl overflow-hidden">
                        <div className="relative w-full h-full">
                          {/* Only render current and next images for smooth transitions */}
                          {[currentQualityControlImageIndex, (currentQualityControlImageIndex + 1) % qualityControlImages.length].map((imageIndex) => (
                            <Image
                              key={imageIndex}
                              src={qualityControlImages[imageIndex]}
                              alt={`Quality Control ${imageIndex + 1}`}
                              fill
                              priority={false}
                              loading="lazy"
                              quality={85}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                                imageIndex === currentQualityControlImageIndex ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          ))}
                          {/* Overlay with step number */}
                          <div className="absolute bottom-4 right-4 bg-[#7A0B18]/80 text-white text-4xl font-serif px-4 py-2 rounded-full">
                            {step.number}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Show emoji placeholder for other steps
                      <div className="relative bg-gradient-to-br from-[#FFF7ED] to-[#FFE4CC] rounded-3xl min-h-[300px] border-4 border-white shadow-xl overflow-hidden">
                        <div className="relative p-12 flex items-center justify-center h-full min-h-[300px]">
                          <div className="text-center">
                            <div className="text-8xl mb-4">{step.emoji}</div>
                            <div className="text-6xl font-serif text-[#7A0B18] opacity-20">{step.number}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-[#C4312E] text-white text-sm font-bold px-4 py-2 rounded-full">
                        {step.number}
                      </div>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-[#C4312E] to-transparent"></div>
                    </div>

                    <h3 className="font-serif text-3xl md:text-4xl text-[#7A0B18] mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-[#6B4423] text-lg mb-4 font-medium">
                      {step.desc}
                    </p>
                    
                    <p className="text-[#8B8680] leading-relaxed">
                      {step.details}
                    </p>

                    {step.number === '05' && (
                      <div className="mt-6 flex items-center gap-2 text-[#C4312E]">
                        <Heart className="fill-current" size={20} />
                        <span className="text-sm font-medium">{t('process.madeWithLove')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
