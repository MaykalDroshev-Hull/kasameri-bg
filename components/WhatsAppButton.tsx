'use client';

import React from 'react';
import { FaViber } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <a 
      href="viber://chat?number=359XXXXXXXXX" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-16 h-16 bg-[#7360F2] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group"
    >
      <FaViber className="w-8 h-8 text-white" />
      <span className="absolute -top-2 -left-2 bg-[#C4312E] text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Viber чат
      </span>
    </a>
  );
};

export default WhatsAppButton;


