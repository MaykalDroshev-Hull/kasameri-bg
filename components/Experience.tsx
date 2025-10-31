'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Experience = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-8 bg-gradient-to-r from-[#7A0B18] to-[#A02820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-white text-lg md:text-2xl font-semibold">
            {t('experience.text')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;


