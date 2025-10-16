'use client';

import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutUs = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-96 bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.5!2d24.941158387027272!3d43.26346616316571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE1JzQ4LjUiTiAyNMKwNTYnMjguMiJF!5e0!3m2!1sen!2sbg!4v1234567890"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-[#4C8F3A] text-sm font-bold tracking-wider mb-3">{t('about.title')}</div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-6">
              {t('about.heading')}
            </h2>
            
            <div className="space-y-4 text-[#6B4423] leading-relaxed">
              <p>
                {t('about.description1')}
              </p>
              <p>
                {t('about.description2')}
              </p>
              <p className="font-medium">
                {t('about.description3')}
              </p>
            </div>

            <div className="mt-6 space-y-2 text-sm text-[#6B4423]">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-[#4C8F3A]" />
                <span>{t('about.visit')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-[#4C8F3A]" />
                <span>{t('about.hours')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;


