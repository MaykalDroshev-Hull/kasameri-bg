'use client';

import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const TrustBar = () => {
  return (
    <div className="bg-[#4C8F3A] text-white py-4 sticky top-20 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around items-center space-y-3 md:space-y-0 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar size={20} />
            <span>12+ години опит • Основани 2013</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={20} />
            <span>Александрово, Ловеч • Локално производство</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users size={20} />
            <span>Семеен бизнес • Честност и качество</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;

