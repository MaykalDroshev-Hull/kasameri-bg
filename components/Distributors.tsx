'use client';

import React, { useState } from 'react';
import { FaViber } from 'react-icons/fa';

const Distributors = () => {
  const [formData, setFormData] = useState({
    company: '',
    phone: '',
    region: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const viberMessage = `ЗАПИТВАНЕ ЗА ДИСТРИБУЦИЯ

Фирма: ${formData.company || 'Не е посочена'}
Телефон: ${formData.phone || 'Не е посочен'}
Регион: ${formData.region || 'Не е посочен'}
Съобщение: ${formData.message || 'Няма допълнително съобщение'}`;

    const encodedMessage = encodeURIComponent(viberMessage);
    window.open(`viber://forward?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="distributors" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#C4312E] text-sm font-bold tracking-wider mb-3">ПАРТНЬОРСТВО</div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-6">
              Станете наш дистрибутор
            </h2>
            
            <p className="text-[#6B4423] text-lg mb-6 leading-relaxed">
              Търсим надеждни партньори, които споделят нашата страст за качество и искат да предложат 
              на своите клиенти истински натурални продукти.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">Конкурентни цени</h4>
                  <p className="text-[#6B4423] text-sm">Атрактивни търговски условия и маржове</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">Гарантирана доставка</h4>
                  <p className="text-[#6B4423] text-sm">Редовни доставки и гъвкави количества</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">Маркетингова подкрепа</h4>
                  <p className="text-[#6B4423] text-sm">Материали, обучения и промоционална помощ</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">Регионална ексклузивност</h4>
                  <p className="text-[#6B4423] text-sm">Възможност за защитена територия</p>
                </div>
              </div>
            </div>

            <a href="#contact" className="inline-block bg-[#C4312E] text-white px-8 py-4 rounded-full hover:bg-[#A02820] transition transform hover:scale-105 font-medium shadow-xl">
              Свържете се с нас
            </a>
          </div>

          <div className="bg-[#FFF7ED] rounded-2xl p-8 shadow-2xl">
            <h3 className="font-serif text-2xl text-[#7A0B18] mb-6">Форма за дистрибутори</h3>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">Име на фирма *</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#D4A574] focus:border-[#C4312E] outline-none transition"
                  placeholder="Вашата фирма ООД"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">Телефон *</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#D4A574] focus:border-[#C4312E] outline-none transition"
                  placeholder="+359 888 123 456"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">Регион на дейност *</label>
                <input 
                  type="text" 
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#D4A574] focus:border-[#C4312E] outline-none transition"
                  placeholder="София, Пловдив..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">Съобщение</label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#D4A574] focus:border-[#C4312E] outline-none transition resize-none"
                  placeholder="Разкажете ни за вашия бизнес..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#7360F2] text-white px-8 py-4 rounded-full hover:bg-[#5F4FD1] transition transform hover:scale-105 font-medium shadow-xl flex items-center justify-center gap-2"
              >
                <FaViber className="w-6 h-6" />
                Изпрати във Viber
              </button>
              <p className="text-xs text-[#8B8680] text-center">
                Ще бъдете пренасочени към Viber за изпращане на запитването
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Distributors;

