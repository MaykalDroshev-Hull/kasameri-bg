'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Footer = () => {
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
              12+ години традиция в отглеждането на качествени плодове и зеленчуци.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Продукти</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#products" className="hover:text-white transition">Ябълки</a></li>
              <li><a href="#products" className="hover:text-white transition">Череши</a></li>
              <li><a href="#products" className="hover:text-white transition">Ябълков сок</a></li>
              <li><a href="#products" className="hover:text-white transition">Всички продукти</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#home" className="hover:text-white transition">За нас</a></li>
              <li><a href="#process" className="hover:text-white transition">Нашият процес</a></li>
              <li><a href="#home" className="hover:text-white transition">Устойчивост</a></li>
              <li><a href="#contact" className="hover:text-white transition">Контакти</a></li>
              <li>
                <a 
                  href="#order" 
                  className="inline-flex items-center gap-2 bg-[#EFBF3A] text-[#7A0B18] px-4 py-2 rounded-lg font-bold hover:bg-[#FFD15C] transition mt-2"
                >
                  <ShoppingCart size={16} />
                  Поръчай
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Бюлетин</h4>
            <p className="text-sm text-white/80 mb-4">
              Абонирайте се за новини и промоции
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-white/20 border-2 border-white/30 outline-none text-white placeholder-white/50 text-sm"
              />
              <button className="bg-[#C4312E] px-4 py-2 rounded-r-lg hover:bg-[#A02820] transition">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>© 2025 Kasameri EOOD. Всички права запазени.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Правила и условия</a>
            <a href="#" className="hover:text-white transition">Поверителност</a>
            <a href="#" className="hover:text-white transition">GDPR</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
