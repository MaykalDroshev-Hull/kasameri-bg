'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-4">{t('testimonials.title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#FFF7ED] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#C4312E] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                М
              </div>
              <div>
                <h4 className="font-bold text-[#7A0B18]">{t('testimonials.maria_name')}</h4>
                <p className="text-sm text-[#8B8680]">{t('testimonials.maria_company')}</p>
              </div>
            </div>
            <p className="text-[#6B4423] italic">
              &quot;{t('testimonials.maria_review')}&quot;
            </p>
            <div className="flex mt-4 text-[#EFBF3A]">
              ★★★★★
            </div>
          </div>

          <div className="bg-[#FFF7ED] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#C4312E] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                П
              </div>
              <div>
                <h4 className="font-bold text-[#7A0B18]">{t('testimonials.petar_name')}</h4>
                <p className="text-sm text-[#8B8680]">{t('testimonials.petar_company')}</p>
              </div>
            </div>
            <p className="text-[#6B4423] italic">
              &quot;{t('testimonials.petar_review')}&quot;
            </p>
            <div className="flex mt-4 text-[#EFBF3A]">
              ★★★★★
            </div>
          </div>

          <div className="bg-[#FFF7ED] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#C4312E] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                Е
              </div>
              <div>
                <h4 className="font-bold text-[#7A0B18]">{t('testimonials.elena_name')}</h4>
                <p className="text-sm text-[#8B8680]">{t('testimonials.elena_company')}</p>
              </div>
            </div>
            <p className="text-[#6B4423] italic">
              &quot;{t('testimonials.elena_review')}&quot;
            </p>
            <div className="flex mt-4 text-[#EFBF3A]">
              ★★★★★
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
