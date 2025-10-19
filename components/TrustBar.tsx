'use client';

import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TrustBar = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-[#4C8F3A] text-white py-4 md:sticky md:top-20 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around items-center space-y-3 md:space-y-0 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar size={20} />
            <span>{t('trust.experience')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={20} />
            <span>{t('trust.location')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users size={20} />
            <span>{t('trust.family')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;


