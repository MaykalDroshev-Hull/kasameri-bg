'use client';

import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-20 px-4 bg-[#7A0B18] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">{t('contact.title')}</h2>
          <p className="text-white/90 text-lg">{t('contact.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-serif text-3xl mb-6">Kasameri EOOD</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold mb-1">{t('contact.address')}</h4>
                  <p className="text-white/80" dangerouslySetInnerHTML={{ __html: t('contact.address_value') }}></p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold mb-1">{t('contact.phone')}</h4>
                  <p className="text-white/80">{t('contact.phone_value')}</p>
                  <p className="text-white/80 text-sm mt-1">{t('contact.hours')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-bold mb-1">{t('contact.email')}</h4>
                  <p className="text-white/80">{t('contact.email_info')}</p>
                  <p className="text-white/80">{t('contact.email_sales')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex space-x-4 pt-4">
                  <a href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <h4 className="font-bold mb-4">{t('contact.working_hours_title')}</h4>
              <div className="space-y-2 text-white/80">
                <div className="flex justify-between">
                  <span>{t('contact.monday_friday')}</span>
                  <span className="font-medium">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contact.saturday')}</span>
                  <span className="font-medium">8:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contact.sunday')}</span>
                  <span className="font-medium">{t('contact.closed')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="font-serif text-2xl mb-6">{t('contact.form_title')}</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('contact.name')}</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 focus:border-white outline-none transition text-white placeholder-white/50"
                  placeholder={t('contact.name_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('contact.email')}</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 focus:border-white outline-none transition text-white placeholder-white/50"
                  placeholder={t('contact.email_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('contact.phone')}</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 focus:border-white outline-none transition text-white placeholder-white/50"
                  placeholder={t('contact.phone_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('contact.message')}</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 focus:border-white outline-none transition text-white placeholder-white/50 resize-none"
                  placeholder={t('contact.message_placeholder')}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#C4312E] text-white px-8 py-4 rounded-full hover:bg-[#A02820] transition transform hover:scale-105 font-medium shadow-xl"
              >
                {t('contact.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
