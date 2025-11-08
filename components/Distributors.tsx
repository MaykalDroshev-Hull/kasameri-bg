'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import React, { useState } from 'react';
import { X } from 'lucide-react';

const Distributors = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    company: '',
    phone: '',
    region: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.company.trim()) {
      newErrors.company = 'Задължително поле';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Задължително поле';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/distributors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const result = await response.json();
      
      // Reset form
      setFormData({
        company: '',
        phone: '',
        region: '',
        message: ''
      });
      
      // Show success message
      setShowSuccess(true);
      
    } catch (error) {
      console.error('Distributor submission error:', error);
      alert('Възникна грешка. Моля опитайте отново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border-4 border-[#4C8F3A] overflow-hidden animate-bounce-in max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition z-10"
            >
              <X size={20} className="text-[#7A0B18]" />
            </button>
            
            <div className="bg-gradient-to-r from-[#4C8F3A] to-[#3D7230] p-6">
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-white">Запитването е изпратено успешно! 🎉</h3>
              </div>
            </div>
            <div className="p-8 text-center">
              <p className="text-[#6B4423] text-lg mb-6 leading-relaxed">
                Благодарим Ви за интереса! Ще се свържем с Вас скоро за обсъждане на детайлите.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-[#4C8F3A] text-white px-6 py-3 rounded-lg hover:bg-[#3D7230] transition font-medium text-lg"
              >
                Разбрах, благодаря!
              </button>
            </div>
          </div>
        </div>
      )}
      
      <section id="distributors" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#C4312E] text-sm font-bold tracking-wider mb-3">{t('distributors.title')}</div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18] mb-6">
              {t('distributors.subtitle')}
            </h2>
            
            <p className="text-[#6B4423] text-lg mb-6 leading-relaxed">
              {t('distributors.description')}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">{t('distributors.prices')}</h4>
                  <p className="text-[#6B4423] text-sm">{t('distributors.prices_desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">{t('distributors.delivery')}</h4>
                  <p className="text-[#6B4423] text-sm">{t('distributors.delivery_desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">{t('distributors.marketing')}</h4>
                  <p className="text-[#6B4423] text-sm">{t('distributors.marketing_desc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#4C8F3A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#7A0B18] mb-1">{t('distributors.exclusivity')}</h4>
                  <p className="text-[#6B4423] text-sm">{t('distributors.exclusivity_desc')}</p>
                </div>
              </div>
            </div>

            <a href="#contact" className="inline-block bg-[#C4312E] text-white px-8 py-4 rounded-full hover:bg-[#A02820] transition transform hover:scale-105 font-medium shadow-xl">
              {t('distributors.contact_title')}
            </a>
          </div>

          <div className="bg-[#FFF7ED] rounded-2xl p-8 shadow-2xl">
            <h3 className="font-serif text-2xl text-[#7A0B18] mb-6">{t('distributors.form_title')}</h3>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">{t('distributors.company_name')}</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => {
                    setFormData({...formData, company: e.target.value});
                    setErrors({...errors, company: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${errors.company ? 'border-red-500' : 'border-[#D4A574]'} focus:border-[#C4312E] outline-none transition`}
                  placeholder={t('distributors.company_placeholder')}
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">{t('distributors.phone')}</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({...formData, phone: e.target.value});
                    setErrors({...errors, phone: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${errors.phone ? 'border-red-500' : 'border-[#D4A574]'} focus:border-[#C4312E] outline-none transition`}
                  placeholder={t('distributors.phone_placeholder')}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">{t('distributors.region')}</label>
                <input 
                  type="text" 
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#D4A574] focus:border-[#C4312E] outline-none transition"
                  placeholder={t('distributors.region_placeholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B4423] mb-2">{t('distributors.message')}</label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#D4A574] focus:border-[#C4312E] outline-none transition resize-none"
                  placeholder={t('distributors.message_placeholder')}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4C8F3A] text-white px-8 py-4 rounded-full hover:bg-[#3D7230] transition transform hover:scale-105 font-medium shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Изпращане...' : t('distributors.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Distributors;


