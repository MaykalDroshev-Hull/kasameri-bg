'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProcessStep {
  number: string;
  titleKey: string;
  descKey: string;
}

const Process = () => {
  const { t } = useLanguage();
  
  const processSteps: ProcessStep[] = [
    { number: '01', titleKey: 'process.harvest', descKey: 'process.harvest_desc' },
    { number: '02', titleKey: 'process.sorting', descKey: 'process.sorting_desc' },
    { number: '03', titleKey: 'process.washing', descKey: 'process.washing_desc' },
    { number: '04', titleKey: 'process.pressing', descKey: 'process.pressing_desc' },
    { number: '05', titleKey: 'process.pasteurization', descKey: 'process.pasteurization_desc' },
    { number: '06', titleKey: 'process.bottling', descKey: 'process.bottling_desc' }
  ];

  return (
    <section id="process" className="py-20 px-4 bg-[#FFF7ED]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#4C8F3A] text-sm font-bold tracking-wider mb-3">{t('process.title')}</div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-4">{t('process.subtitle')}</h2>
          <p className="text-[#6B4423] text-lg max-w-2xl mx-auto">
            {t('process.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#C4312E] to-[#4C8F3A]"></div>
              
              <div className="text-6xl font-serif text-[#EFBF3A] opacity-20 absolute top-4 right-4 group-hover:scale-110 transition-transform">
                {step.number}
              </div>
              
              <div className="relative">
                <div className="text-[#C4312E] font-bold text-sm mb-2">{step.number}</div>
                <h4 className="font-serif text-2xl text-[#7A0B18] mb-2">{t(step.titleKey)}</h4>
                <p className="text-[#6B4423]">{t(step.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
