'use client';

import React from 'react';

const Sustainability = () => {
  return (
    <section className="py-20 px-4 bg-[#4C8F3A] text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-12">Устойчивост и отговорност</h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="font-serif text-2xl mb-3">Рециклиране на вода</h3>
            <p className="text-white/90">Използваме затворени системи за измиване, които рециклират до 80% от водата.</p>
          </div>

          <div>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="font-serif text-2xl mb-3">Нулеви отпадъци</h3>
            <p className="text-white/90">Джибрите от пресоване стават компост или храна за животни.</p>
          </div>

          <div>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
            </div>
            <h3 className="font-serif text-2xl mb-3">Локална заетост</h3>
            <p className="text-white/90">Осигуряваме над 30 работни места в региона, подкрепяйки местната общност.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;

