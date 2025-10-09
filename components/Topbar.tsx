'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#7A0B18] shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-[#C4312E] rounded-full flex items-center justify-center text-white font-bold text-xl">K</div>
            <div className="text-white">
              <div className="font-serif text-xl font-bold">Kasameri</div>
              <div className="text-xs opacity-80">EOOD</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-[#EFBF3A] transition">Начало</a>
            <a href="#products" className="text-white hover:text-[#EFBF3A] transition">Продукти</a>
            <a href="#process" className="text-white hover:text-[#EFBF3A] transition">Процес</a>
            <a href="#distributors" className="text-white hover:text-[#EFBF3A] transition">Дистрибутори</a>
            <a href="#contact" className="text-white hover:text-[#EFBF3A] transition">Контакти</a>
            <button className="bg-[#C4312E] text-white px-6 py-2 rounded-full hover:bg-[#A02820] transition transform hover:scale-105">
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#7A0B18] border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            <a href="#home" className="block text-white hover:text-[#EFBF3A] py-2">Начало</a>
            <a href="#products" className="block text-white hover:text-[#EFBF3A] py-2">Продукти</a>
            <a href="#process" className="block text-white hover:text-[#EFBF3A] py-2">Процес</a>
            <a href="#distributors" className="block text-white hover:text-[#EFBF3A] py-2">Дистрибутори</a>
            <a href="#contact" className="block text-white hover:text-[#EFBF3A] py-2">Контакти</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
