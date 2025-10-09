'use client';

import React from 'react';

interface ProcessStep {
  number: string;
  title: string;
  titleEn: string;
  desc: string;
}

const Process = () => {
  const processSteps: ProcessStep[] = [
    { number: '01', title: 'Жътва', titleEn: 'Harvest', desc: 'Ръчно берем плодовете в оптимална зрялост' },
    { number: '02', title: 'Сортиране', titleEn: 'Sorting', desc: 'Внимателна селекция за качество' },
    { number: '03', title: 'Измиване', titleEn: 'Washing', desc: 'Почистване с природна вода' },
    { number: '04', title: 'Пресоване', titleEn: 'Pressing', desc: 'Студено пресоване за максимален вкус' },
    { number: '05', title: 'Пастьоризация', titleEn: 'Pasteurization', desc: 'Запазване на свежестта' },
    { number: '06', title: 'Бутилиране', titleEn: 'Bottling', desc: 'Опаковане и етикетиране' }
  ];

  return (
    <section id="process" className="py-20 px-4 bg-[#FFF7ED]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#4C8F3A] text-sm font-bold tracking-wider mb-3">ОТ ПЛОДА ДО БУТИЛКАТА</div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-4">Нашият процес</h2>
          <p className="text-[#6B4423] text-lg max-w-2xl mx-auto">
            Всяка стъпка е проектирана да запази свежестта, вкуса и хранителните стойности на плодовете.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#C4312E] to-[#4C8F3A]"></div>
              
              <div className="text-6xl font-serif text-[#EFBF3A] opacity-20 absolute top-4 right-4 group-hover:scale-110 transition-transform">
                {step.number}
              </div>
              
              <div className="relative">
                <div className="text-[#C4312E] font-bold text-sm mb-2">{step.number}</div>
                <h4 className="font-serif text-2xl text-[#7A0B18] mb-2">{step.title}</h4>
                <p className="text-[#8B8680] text-xs mb-3">{step.titleEn}</p>
                <p className="text-[#6B4423]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
