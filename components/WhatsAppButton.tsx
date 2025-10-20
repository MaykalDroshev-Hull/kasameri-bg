'use client';

import React from 'react';
import { FaViber } from 'react-icons/fa';
import { Facebook, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhatsAppButton = () => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip on the left side - always visible with blinking animation */}
      <span className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-[#7A0B18] text-white text-sm px-4 py-2 rounded-full opacity-100 whitespace-nowrap shadow-lg animate-pulse">
        {t('common.startChat')}
        {/* Arrow pointing to the buttons */}
        <span className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-8 border-l-[#7A0B18] border-t-4 border-b-4 border-t-transparent border-b-transparent"></span>
      </span>
      
      {/* Buttons Container */}
      <div className="flex flex-col space-y-3">
        {/* Phone Call Button */}
        <a 
          href="tel:+359878115494" 
          className="w-16 h-16 bg-green-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
        >
          <Phone className="w-8 h-8 text-white" />
        </a>
        
        {/* Viber Button */}
        <a 
          href="viber://chat?number=%2B359878115494" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#7360F2] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
        >
          <FaViber className="w-8 h-8 text-white" />
        </a>
        
        {/* Messenger Button */}
        <a 
          href="https://www.facebook.com/profile.php?id=61581801093204" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#0084FF] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
        >
          <Facebook className="w-8 h-8 text-white" />
        </a>
      </div>
    </div>
  );
};

export default WhatsAppButton;


