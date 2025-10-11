'use client';

import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-4">Какво казват нашите партньори</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#FFF7ED] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#C4312E] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                М
              </div>
              <div>
                <h4 className="font-bold text-[#7A0B18]">Мария Димитрова</h4>
                <p className="text-sm text-[#8B8680]">BioMarket Sofia</p>
              </div>
            </div>
            <p className="text-[#6B4423] italic">
              &quot;Работим с Касамери вече 3 години. Качеството е винаги на високо ниво, а сокът им е 
              най-продаваният в магазина ни. Клиентите питат специално за него!&quot;
            </p>
            <div className="flex mt-4 text-[#EFBF3A]">
              ★★★★★
            </div>
          </div>

          <div className="bg-[#FFF7ED] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#C4312E] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                П
              </div>
              <div>
                <h4 className="font-bold text-[#7A0B18]">Петър Георгиев</h4>
                <p className="text-sm text-[#8B8680]">ЕкоПазар ЕООД</p>
              </div>
            </div>
            <p className="text-[#6B4423] italic">
              &quot;Надеждни, коректни и винаги навреме с доставките. Плодовете са свежи, 
              а комуникацията е отлична. Силно препоръчвам за дистрибуция!&quot;
            </p>
            <div className="flex mt-4 text-[#EFBF3A]">
              ★★★★★
            </div>
          </div>

          <div className="bg-[#FFF7ED] rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#C4312E] rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                Е
              </div>
              <div>
                <h4 className="font-bold text-[#7A0B18]">Елена Стоянова</h4>
                <p className="text-sm text-[#8B8680]">Ресторант &quot;Традиция&quot;</p>
              </div>
            </div>
            <p className="text-[#6B4423] italic">
              &quot;Използваме техните домати и ябълки в менюто си. Гостите забелязват 
              разликата във вкуса. Това са истински продукти, отгледани с грижа!&quot;
            </p>
            <div className="flex mt-4 text-[#EFBF3A]">
              ★★★★★
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


