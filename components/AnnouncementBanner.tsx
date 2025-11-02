'use client';

import React, { useState, useEffect } from 'react';
import { X, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AnnouncementBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem('announcement-banner-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    // Fade out animation
    setIsVisible(false);
    
    // Save to localStorage and update state after animation
    setTimeout(() => {
      localStorage.setItem('announcement-banner-dismissed', 'true');
      setIsDismissed(true);
    }, 300);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={`fixed top-20 w-full z-40 bg-[#EFBF3A] transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 max-h-0'
      } overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3">
        <div className="flex items-start sm:items-center justify-between gap-2">
          <div className="flex items-start sm:items-center space-x-2 flex-1 min-w-0">
            <Phone size={20} className="text-[#7A0B18] flex-shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-[#7A0B18] text-xs sm:text-sm">
              <p className="font-medium">
                {t('banner.bulkOrders')}{' '}
                <a
                  href="tel:+359879191128"
                  className="font-bold hover:underline transition"
                >
                  0879191128
                </a>
              </p>
              <p className="text-[#6B4423] mt-0.5">
                {t('banner.viberNote')}
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-[#d4a622] rounded-full transition flex-shrink-0"
            aria-label="Close banner"
          >
            <X size={18} className="text-[#7A0B18]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;

