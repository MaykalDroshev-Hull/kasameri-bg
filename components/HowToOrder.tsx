'use client';

import React from 'react';
import { ShoppingCart, Plus, MessageCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HowToOrder = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: ShoppingCart,
      title: t('howToOrder.step1'),
      description: t('howToOrder.step1Desc'),
      color: '#7A0B18'
    },
    {
      icon: Plus,
      title: t('howToOrder.step2'),
      description: t('howToOrder.step2Desc'),
      color: '#4C8F3A'
    },
    {
      icon: MessageCircle,
      title: t('howToOrder.step3'),
      description: t('howToOrder.step3Desc'),
      color: '#7360F2'
    },
    {
      icon: CheckCircle,
      title: t('howToOrder.step4'),
      description: t('howToOrder.step4Desc'),
      color: '#EFBF3A'
    }
  ];

  return (
    <section className="py-12 px-4 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#7A0B18] text-center mb-10">
          {t('howToOrder.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-[#FFF7ED] hover:shadow-lg transition-shadow"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <Icon size={32} style={{ color: step.color }} />
                </div>
                
                <div className="flex items-center justify-center mb-2">
                  <span 
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm mr-3"
                    style={{ backgroundColor: step.color }}
                  >
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-[#7A0B18]">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-[#6B4423] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;

