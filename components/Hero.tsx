'use client';

import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#7A0B18]/50 to-[#7A0B18]/70 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&h=1080&fit=crop" 
        alt="Orchard" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-4 drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.9)' }}>
            От градината в бутилката
          </h1>
          <p className="text-white text-lg md:text-xl mb-2 font-medium" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            From Our Orchard to Your Table
          </p>
          <p className="text-white text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            12+ години отглеждаме качествени плодове и зеленчуци в сърцето на Ловешко. 
            Опитайте нашия 100% натурален ябълков сок.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products" className="bg-[#C4312E] text-white px-8 py-4 rounded-full hover:bg-[#A02820] transition transform hover:scale-105 font-medium shadow-xl">
              Разгледай Продуктите
            </a>
            <a href="#distributors" className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#7A0B18] transition transform hover:scale-105 font-medium shadow-xl">
              Станете Дистрибутор
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
