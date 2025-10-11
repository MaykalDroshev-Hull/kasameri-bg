'use client';

import React, { useState } from 'react';
import { Plus, Minus, Send, Apple, Truck, BadgeCheck } from 'lucide-react';

const Order = () => {
  const [quantity, setQuantity] = useState(1);
  const pricePerPack = 10; // BGN
  const pricePerPackEUR = 5.11; // EUR (BGN/1.95583)

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleViberOrder = () => {
    const message = `Здравейте, бих искал да закупя ${quantity} ${quantity === 1 ? 'опаковка' : 'опаковки'} сок. Имате ли наличност?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`viber://forward?text=${encodedMessage}`, '_blank');
  };

  const totalBGN = quantity * pricePerPack;
  const totalEUR = (quantity * pricePerPackEUR).toFixed(2);

  return (
    <section id="order" className="py-20 px-4 bg-gradient-to-br from-[#FFF7ED] to-[#FFE4CC]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-4">
            Поръчай ябълков сок
          </h2>
          <p className="text-[#6B4423] text-lg max-w-2xl mx-auto">
            100% натурален ябълков сок без добавена захар, консерванти или оцветители
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-80 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop"
                alt="Ябълков сок"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Order Form Section */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="font-serif text-3xl text-[#7A0B18] mb-3">
                  Ябълков сок
                </h3>
                <p className="text-[#6B4423] text-sm mb-4">
                  Опаковка: 3 литра
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-[#C4312E]">
                    {pricePerPack} лв
                  </span>
                  <span className="text-xl text-[#8B8680]">
                    ({pricePerPackEUR.toFixed(2)} €)
                  </span>
                  <span className="text-sm text-[#6B4423]">
                    за опаковка
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-[#6B4423] font-medium mb-3">
                  Количество:
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="w-12 h-12 rounded-full bg-[#7A0B18] text-white flex items-center justify-center hover:bg-[#A01020] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
                  >
                    <Minus size={20} />
                  </button>
                  
                  <div className="flex-1 text-center">
                    <div className="text-5xl font-bold text-[#7A0B18]">
                      {quantity}
                    </div>
                    <div className="text-sm text-[#8B8680] mt-1">
                      {quantity === 1 ? 'опаковка' : 'опаковки'}
                    </div>
                  </div>
                  
                  <button
                    onClick={handleIncrement}
                    className="w-12 h-12 rounded-full bg-[#7A0B18] text-white flex items-center justify-center hover:bg-[#A01020] transition-colors shadow-lg"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="mb-8 p-6 bg-[#FFF7ED] rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B4423] font-medium">Обща сума:</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#C4312E]">
                      {totalBGN} лв
                    </div>
                    <div className="text-lg text-[#8B8680]">
                      ({totalEUR} €)
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={handleViberOrder}
                className="w-full bg-[#7A0B18] text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-[#A01020] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Send size={24} />
                Потвърди във Viber
              </button>

              <p className="text-xs text-[#8B8680] text-center mt-4">
                Ще бъдете пренасочени към Viber за потвърждение на поръчката
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-center mb-3">
              <Apple className="text-[#C4312E]" size={48} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-[#7A0B18] mb-2">100% Натурален</h4>
            <p className="text-sm text-[#6B4423]">Без добавена захар</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-center mb-3">
              <Truck className="text-[#4C8F3A]" size={48} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-[#7A0B18] mb-2">Бърза доставка</h4>
            <p className="text-sm text-[#6B4423]">Доставяме в рамките на 2-3 дни</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-center mb-3">
              <BadgeCheck className="text-[#EFBF3A]" size={48} strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-[#7A0B18] mb-2">Качествен продукт</h4>
            <p className="text-sm text-[#6B4423]">От нашата собствена реколта</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;

