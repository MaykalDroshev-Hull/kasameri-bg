'use client';

import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProcessStep {
  number: string;
  emoji: string;
  title: string;
  desc: string;
  details: string;
}

const Process = () => {
  const { t } = useLanguage();
  
  const processSteps: ProcessStep[] = [
    { 
      number: '01', 
      emoji: '🌳',
      title: 'Нашите градини', 
      desc: 'Всичко започва в нашите екологични градини, където природата и грижата се срещат.',
      details: 'Отглеждаме плодовете си в плодородни почви, богати на минерали и хранителни вещества. Всяко дърво получава индивидуално внимание и грижа през целия сезон.'
    },
    { 
      number: '02', 
      emoji: '👐',
      title: 'Ръчно бране', 
      desc: 'Всеки плод е внимателно избран на ръка в момента на перфектна зрялост.',
      details: 'Нашият екип от опитни работници познава всяко дърво и бере само най-качествените плодове. Това гарантира, че само най-добрите стигат до вас.'
    },
    { 
      number: '03', 
      emoji: '⚙️',
      title: 'Модерни машини', 
      desc: 'Използваме съвременно оборудване за преработка, което запазва качеството.',
      details: 'Най-новите технологии за измиване, сортиране и пресоване осигуряват максимална хигиена и ефективност, като същевременно запазват всички полезни вещества.'
    },
    { 
      number: '04', 
      emoji: '🔬',
      title: 'Контрол на качеството', 
      desc: 'Всяка партида преминава през строг контрол и тестване за качество.',
      details: 'Проверяваме всеки етап от процеса - от pH нивата до бактериологичните тестове. Нищо не минава без нашето одобрение.'
    },
    { 
      number: '05', 
      emoji: '❤️',
      title: 'Любов към процеса', 
      desc: 'В края на краищата, най-важната съставка е любовта към това, което правим.',
      details: 'Всеки член от нашето семейство Касамери влага сърце и душа в производството. Това е нашата страст, не просто работа.'
    }
  ];

  return (
    <section id="process" className="py-20 px-4 bg-gradient-to-b from-white to-[#FFF7ED]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#4C8F3A] text-sm font-bold tracking-wider mb-3">ОТ ГРАДИНАТА ДО ВАШАТА МАСА</div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-4">Нашият процес на работа</h2>
          <p className="text-[#6B4423] text-lg max-w-2xl mx-auto">
            Всяка стъпка е изпълнена с грижа, внимание и страст към качеството. Така създаваме продукти, на които можете да се доверите.
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {processSteps.map((step, index) => (
            <div key={index}>
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                {/* Image Placeholder */}
                <div className="w-full md:w-1/2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7A0B18]/20 to-[#4C8F3A]/20 rounded-3xl transform group-hover:scale-105 transition-transform duration-300"></div>
                    <div className="relative bg-gradient-to-br from-[#FFF7ED] to-[#FFE4CC] rounded-3xl p-12 flex items-center justify-center min-h-[300px] border-4 border-white shadow-xl">
                      <div className="text-center">
                        <div className="text-8xl mb-4">{step.emoji}</div>
                        <div className="text-6xl font-serif text-[#7A0B18] opacity-20">{step.number}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-[#C4312E] text-white text-sm font-bold px-4 py-2 rounded-full">
                        {step.number}
                      </div>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-[#C4312E] to-transparent"></div>
                    </div>

                    <h3 className="font-serif text-3xl md:text-4xl text-[#7A0B18] mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-[#6B4423] text-lg mb-4 font-medium">
                      {step.desc}
                    </p>
                    
                    <p className="text-[#8B8680] leading-relaxed">
                      {step.details}
                    </p>

                    {step.number === '05' && (
                      <div className="mt-6 flex items-center gap-2 text-[#C4312E]">
                        <Heart className="fill-current" size={20} />
                        <span className="text-sm font-medium">Направено с любов</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Arrow - Hidden on last item */}
              {index < processSteps.length - 1 && (
                <div className="flex justify-center my-8">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#C4312E] to-[#4C8F3A]"></div>
                    <ArrowRight 
                      className="text-[#C4312E] transform rotate-90 animate-bounce" 
                      size={32} 
                      strokeWidth={3}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#7A0B18] to-[#C4312E] rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="font-serif text-3xl md:text-4xl mb-4">Вкусете разликата</h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Нашата грижа и внимание към детайлите правят продуктите ни специални. Всяка глътка разказва история за традиция и качество.
            </p>
            <a 
              href="#order"
              className="inline-flex items-center gap-2 bg-white text-[#7A0B18] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#EFBF3A] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Поръчайте сега
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
