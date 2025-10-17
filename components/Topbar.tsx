'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/store/cartStore';
import CartDrawer from './CartDrawer';

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { items } = useCartStore();

  const toggleLanguage = () => {
    setLanguage(language === 'bg' ? 'en' : 'bg');
  };

  const cartItemCount = items.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <nav className="fixed w-full z-50 bg-[#7A0B18] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <Image 
                src="/logo.svg" 
                alt="Kasameri Logo" 
                width={48} 
                height={48} 
                className="object-contain"
              />
              <div className="text-white">
                <div className="font-serif text-xl font-bold">Kasameri</div>
                <div className="text-xs opacity-80">EOOD</div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-white hover:text-[#EFBF3A] transition">{t('nav.home')}</a>
              <a href="#products" className="text-white hover:text-[#EFBF3A] transition">{t('nav.products')}</a>
              <a href="#process" className="text-white hover:text-[#EFBF3A] transition">{t('nav.process')}</a>
              <a href="#distributors" className="text-white hover:text-[#EFBF3A] transition">{t('nav.distributors')}</a>
              <a href="#contact" className="text-white hover:text-[#EFBF3A] transition">{t('nav.contact')}</a>
              
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-white hover:text-[#EFBF3A] transition"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C4312E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={toggleLanguage}
                className="bg-[#C4312E] text-white px-6 py-2 rounded-full hover:bg-[#A02820] transition transform hover:scale-105"
              >
                {language === 'bg' ? 'EN' : 'BG'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-white hover:text-[#EFBF3A] transition"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C4312E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed top-20 left-0 right-0 z-40 md:hidden border-t border-white/20 transition-all duration-500 bg-[#7A0B18]"
        >
          <div className="px-4 py-4 space-y-3">
            <a
              href="#home"
              className="block text-white hover:text-[#EFBF3A] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </a>
            <a
              href="#products"
              className="block text-white hover:text-[#EFBF3A] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.products')}
            </a>
            <a
              href="#process"
              className="block text-white hover:text-[#EFBF3A] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.process')}
            </a>
            <a
              href="#distributors"
              className="block text-white hover:text-[#EFBF3A] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.distributors')}
            </a>
            <a
              href="#contact"
              className="block text-white hover:text-[#EFBF3A] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </a>
            <a
              href="#order"
              className="flex items-center justify-center gap-2 bg-[#EFBF3A] text-[#7A0B18] py-3 px-4 rounded-lg font-bold text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart size={18} />
              {t('nav.orderNow')}
            </a>
            <button
              onClick={toggleLanguage}
              className="block w-full text-left bg-[#C4312E] text-white px-4 py-2 rounded-full hover:bg-[#A02820] transition"
            >
              {language === "bg" ? "EN" : "BG"}
            </button>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default Topbar;