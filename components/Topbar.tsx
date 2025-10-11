'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#7A0B18] shadow-lg' 
        : 'bg-white/10 backdrop-blur-md shadow-xl border-b border-white/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#home" className="flex items-center space-x-3">
            <div className="relative w-14 h-14 transition-all duration-500">
              <Image 
                src="/logo.svg" 
                alt="Kasameri Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-white" style={{ textShadow: scrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.8)' }}>
              <div className="font-serif text-xl font-bold">Kasameri</div>
              <div className="text-xs opacity-80">EOOD</div>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-white hover:text-[#EFBF3A] transition" style={{ textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.8)' }}>Начало</a>
            <a href="#products" className="text-white hover:text-[#EFBF3A] transition" style={{ textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.8)' }}>Продукти</a>
            <a href="#process" className="text-white hover:text-[#EFBF3A] transition" style={{ textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.8)' }}>Процес</a>
            <a href="#distributors" className="text-white hover:text-[#EFBF3A] transition" style={{ textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.8)' }}>Дистрибутори</a>
            <a href="#contact" className="text-white hover:text-[#EFBF3A] transition" style={{ textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.8)' }}>Контакти</a>
            <a 
              href="#order" 
              className="bg-[#EFBF3A] text-[#7A0B18] px-6 py-2.5 rounded-full font-bold hover:bg-[#FFD15C] transition transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Поръчай
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden border-t border-white/20 transition-all duration-500 ${
          scrolled ? 'bg-[#7A0B18]' : 'bg-white/10 backdrop-blur-md'
        }`}>
          <div className="px-4 py-4 space-y-3">
            <a href="#home" className="block text-white hover:text-[#EFBF3A] py-2" style={{ textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.8)' }}>Начало</a>
            <a href="#products" className="block text-white hover:text-[#EFBF3A] py-2" style={{ textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.8)' }}>Продукти</a>
            <a href="#process" className="block text-white hover:text-[#EFBF3A] py-2" style={{ textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.8)' }}>Процес</a>
            <a href="#distributors" className="block text-white hover:text-[#EFBF3A] py-2" style={{ textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.8)' }}>Дистрибутори</a>
            <a href="#contact" className="block text-white hover:text-[#EFBF3A] py-2" style={{ textShadow: scrolled ? 'none' : '0 2px 6px rgba(0,0,0,0.8)' }}>Контакти</a>
            <a 
              href="#order" 
              className="flex items-center justify-center gap-2 bg-[#EFBF3A] text-[#7A0B18] py-3 px-4 rounded-lg font-bold text-center mt-4"
            >
              <ShoppingCart size={18} />
              Поръчай сега
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
