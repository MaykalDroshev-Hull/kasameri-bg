'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Distributors = () => {
  const { t } = useLanguage();
  return (
    <section id="distributors" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#C4312E] text-sm font-bold tracking-wider mb-3">{t('distributors.title')}</div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-6">
              {t('distributors.subtitle')}
            </h2>
            
            <p className="text-[#6B4423] text-lg mb-6 leading-relaxed">
              {t('distributors.description')}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">{t('distributors.prices')}</h4>
                  <p className="text-[#6B4423] text-sm">{t('distributors.prices_desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">{t('distributors.delivery')}</h4>
                  <p className="text-[#6B4423] text-sm">{t('distributors.delivery_desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">{t('distributors.marketing')}</h4>
                  <p className="text-[#6B4423] text-sm">{t('distributors.marketing_desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">{t('distributors.exclusivity')}</h4>
                  <p className="text-[#6B4423] text-sm">{t('distributors.exclusivity_desc')}</p>
                </div>
              </div>
            </div>

            <a href="#contact" className="inline-block bg-[#C4312E] text-white px-8 py-4 rounded-full hover:bg-[#A02820] transition transform hover:scale-105 font-medium shadow-xl">
              {t('distributors.contact_title')}
            </a>
          </div>

          <div className="bg-[#FFF7ED] rounded-2xl p-8 shadow-2xl">
            <h3 className="font-serif text-2xl text-[#7A0B18] mb-6">{t('distributors.form_title')}</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">{t('distributors.company_name')}</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#D4A574] focus:border-[#C4312E] outline-none transition"
                  placeholder={t('distributors.company_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">{t('distributors.phone')}</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#D4A574] focus:border-[#C4312E] outline-none transition"
                  placeholder={t('distributors.phone_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">{t('distributors.region')}</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#D4A574] focus:border-[#C4312E] outline-none transition"
                  placeholder={t('distributors.region_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">{t('distributors.message')}</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#D4A574] focus:border-[#C4312E] outline-none transition resize-none"
                  placeholder={t('distributors.message_placeholder')}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#C4312E] text-white px-8 py-4 rounded-full hover:bg-[#A02820] transition transform hover:scale-105 font-medium shadow-xl"
              >
                {t('distributors.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Distributors;


