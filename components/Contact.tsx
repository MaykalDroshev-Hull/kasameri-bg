'use client';

import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-12 px-4 bg-[#7A0B18] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl mb-3">{t('contact.title')}</h2>
          <p className="text-white/90">{t('contact.subtitle')}</p>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <div>
            <h3 className="font-serif text-2xl mb-6">Kasameri EOOD</h3>
            
            {/* Contact info in one line */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-8">
              <div className="flex items-center space-x-2">
                <MapPin className="flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-sm">{t('contact.address')}</h4>
                  <p className="text-white/80 text-sm" dangerouslySetInnerHTML={{ __html: t('contact.address_value') }}></p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-sm">{t('contact.phone')}</h4>
                  <p className="text-white/80 text-sm">{t('contact.phone_value')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-bold text-sm">{t('contact.email')}</h4>
                  <p className="text-white/80 text-sm">{t('contact.email_info')}</p>
                </div>
              </div>
            </div>

            {/* Social media */}
            <div className="flex justify-center items-center space-x-4 mb-6">
              <a href="https://www.facebook.com/groups/1819576442319363/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                <Instagram size={18} />
              </a>
            </div>

            {/* Working hours */}
            <div className="border-t border-white/20 pt-4">
              <h4 className="font-bold mb-3 text-sm">{t('contact.working_hours_title')}</h4>
              <div className="space-y-1 text-white/80 text-sm max-w-md mx-auto">
                <div className="flex justify-between">
                  <span>{t('contact.monday_friday')}</span>
                  <span className="font-medium">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contact.saturday')}</span>
                  <span className="font-medium">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contact.sunday')}</span>
                  <span className="font-medium">8:00 - 17:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
