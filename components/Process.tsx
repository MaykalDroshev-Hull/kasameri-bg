'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Heart } from 'lucide-react';
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
    '/images/viber_image_2025-10-08_20-48-05-466.jpg',
    '/images/viber_image_2025-10-08_20-48-09-665.jpg',
    '/images/viber_image_2025-10-08_21-25-56-611.jpg',
    '/images/viber_image_2025-10-08_21-25-57-328.jpg'
  ];

  // Images for the "Hand Picking" step
  const handPickingImages = [
    '/images/viber_image_2025-10-08_21-16-57-707.jpg',
    '/images/viber_image_2025-10-08_21-16-57-675.jpg',
    '/images/viber_image_2025-10-08_21-16-57-643.jpg',
    '/images/viber_image_2025-10-08_21-16-57-526.jpg',
    '/images/viber_image_2025-10-08_21-16-57-287.jpg',
    '/images/viber_image_2025-10-08_20-48-08-484.jpg'
  ];

  // Images for the "Modern Machinery" step
  const machineryImages = [
    '/images/viber_image_2025-10-13_13-14-44-875.jpg',
    '/images/viber_image_2025-10-13_13-14-45-099.jpg',
    '/images/viber_image_2025-10-13_13-14-41-898.jpg'
  ];

  // Images for the "Love for the Process" step
  const loveProcessImages = [
    '/images/viber_image_2025-10-08_21-39-22-222.jpg',
    '/images/viber_image_2025-10-08_21-55-41-987.jpg',
    '/images/viber_image_2025-10-08_21-25-57-328.jpg'
  ];

  // Images for the "Quality Control" step
  const qualityControlImages = [
    '/images/viber_image_2025-10-08_21-16-57-847.jpg',
    '/images/viber_image_2025-10-08_21-16-57-793.jpg'
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
                          {orchardImages.map((image, imageIndex) => (
                            <Image
                              key={imageIndex}
                              src={image}
                              alt={`Orchard ${imageIndex + 1}`}
                              fill
                              priority={imageIndex === 0}
                              quality={95}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                                isMounted && imageIndex === currentOrchardImageIndex ? 'opacity-100' : imageIndex === 0 ? 'opacity-100' : 'opacity-0'
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
                          {handPickingImages.map((image, imageIndex) => (
                            <Image
                              key={imageIndex}
                              src={image}
                              alt={`Hand Picking ${imageIndex + 1}`}
                              fill
                              priority={imageIndex === 0}
                              quality={95}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                                isMounted && imageIndex === currentHandPickingImageIndex ? 'opacity-100' : imageIndex === 0 ? 'opacity-100' : 'opacity-0'
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
                          {machineryImages.map((image, imageIndex) => (
                            <Image
                              key={imageIndex}
                              src={image}
                              alt={`Modern Machinery ${imageIndex + 1}`}
                              fill
                              priority={imageIndex === 0}
                              quality={95}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                                isMounted && imageIndex === currentMachineryImageIndex ? 'opacity-100' : imageIndex === 0 ? 'opacity-100' : 'opacity-0'
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
                          {loveProcessImages.map((image, imageIndex) => (
                            <Image
                              key={imageIndex}
                              src={image}
                              alt={`Love for the Process ${imageIndex + 1}`}
                              fill
                              priority={imageIndex === 0}
                              quality={95}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                                isMounted && imageIndex === currentLoveProcessImageIndex ? 'opacity-100' : imageIndex === 0 ? 'opacity-100' : 'opacity-0'
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
                          {qualityControlImages.map((image, imageIndex) => (
                            <Image
                              key={imageIndex}
                              src={image}
                              alt={`Quality Control ${imageIndex + 1}`}
                              fill
                              priority={imageIndex === 0}
                              quality={95}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
                                isMounted && imageIndex === currentQualityControlImageIndex ? 'opacity-100' : imageIndex === 0 ? 'opacity-100' : 'opacity-0'
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

              {/* Arrow - Hidden on last item */}
              {index < processSteps.length - 1 && (
                <div className="flex justify-center my-8">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#C4312E] to-[#4C8F3A]"></div>
                    <ArrowRight 
                      className="text-[#C4312E] transform rotate-90 animate-bounce" 
                      size={32} 
                      strokeWidth={3}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#7A0B18] to-[#C4312E] rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="font-serif text-3xl md:text-4xl mb-4">{t('process.tasteDifference')}</h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              {t('process.careDescription')}
            </p>
            <a 
              href="#order"
              className="inline-flex items-center gap-2 bg-white text-[#7A0B18] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#EFBF3A] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t('process.orderNow')}
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
