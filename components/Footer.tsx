'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#6B4423] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60 gap-4">
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
