'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#6B4423] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#C4312E] rounded-full flex items-center justify-center text-white font-bold">K</div>
              <div>
                <div className="font-serif text-lg font-bold">Kasameri</div>
                <div className="text-xs opacity-80">EOOD</div>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t('footer.products_title')}</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#products" className="hover:text-white transition">{t('footer.apples')}</a></li>
              <li><a href="#products" className="hover:text-white transition">{t('footer.cherries')}</a></li>
              <li><a href="#products" className="hover:text-white transition">{t('footer.juice')}</a></li>
              <li><a href="#products" className="hover:text-white transition">{t('footer.all_products')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t('footer.company_title')}</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#home" className="hover:text-white transition">{t('footer.about_us')}</a></li>
              <li><a href="#process" className="hover:text-white transition">{t('footer.our_process')}</a></li>
              <li><a href="#home" className="hover:text-white transition">{t('footer.sustainability')}</a></li>
              <li><a href="#contact" className="hover:text-white transition">{t('footer.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t('footer.newsletter_title')}</h4>
            <p className="text-sm text-white/80 mb-4">
              {t('footer.newsletter_subtitle')}
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder={t('footer.email_placeholder')}
                className="flex-1 px-4 py-2 rounded-l-lg bg-white/20 border-2 border-white/30 outline-none text-white placeholder-white/50 text-sm"
              />
              <button className="bg-[#C4312E] px-4 py-2 rounded-r-lg hover:bg-[#A02820] transition">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>{t('footer.copyright')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">{t('footer.terms')}</a>
            <a href="#" className="hover:text-white transition">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition">{t('footer.gdpr')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
