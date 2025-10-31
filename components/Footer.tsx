'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#6B4423] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image 
                src="/logo.svg" 
                alt="Kasameri Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
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
              <li>
                <a 
                  href="#order" 
                  className="inline-flex items-center gap-2 bg-[#EFBF3A] text-[#7A0B18] px-4 py-2 rounded-lg font-bold hover:bg-[#FFD15C] transition mt-2"
                >
                  <ShoppingCart size={16} />
                  {t('footer.order')}
                </a>
              </li>
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

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60 gap-4">
  <p>{t('footer.copyright')}</p>
  <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
    <a href="/privacy-policy" className="hover:text-white transition">{t('footer.terms')}</a>
    <a href="/privacy-policy" className="hover:text-white transition">{t('footer.privacy')}</a>
    <a href="/privacy-policy" className="hover:text-white transition">{t('footer.gdpr')}</a>
    <span className="text-xs text-white/40">
      {t('footer.built_by')}{' '}
      <a 
        href="https://www.hmwspro.com/bg" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white/60 hover:text-white transition font-medium underline decoration-white/30 hover:decoration-white"
      >
        H&M WS Pro
      </a>
    </span>
  </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
