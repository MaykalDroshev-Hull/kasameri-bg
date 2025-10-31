'use client';

import React, { useState, useEffect } from 'react';
import { X, Cookie, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CookieConsent = () => {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const saveConsent = (acceptAll: boolean = false) => {
    const consentData = {
      necessary: true,
      functional: acceptAll ? true : preferences.functional,
      analytics: acceptAll ? true : preferences.analytics,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true);
  };

  const handleRejectAll = () => {
    setPreferences({
      necessary: true,
      functional: false,
      analytics: false,
    });
    saveConsent(false);
  };

  const handleSavePreferences = () => {
    saveConsent(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <div className="w-full max-w-4xl pointer-events-auto">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#7A0B18] overflow-hidden">
          {!showSettings ? (
            // Main Banner
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Cookie className="text-[#7A0B18]" size={32} />
                  <h2 className="text-xl md:text-2xl font-bold text-[#7A0B18]">
                    {t('cookie.title')}
                  </h2>
                </div>
              </div>

              <p className="text-[#6B4423] text-sm md:text-base mb-6 leading-relaxed">
                {t('cookie.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-[#C4312E] text-white px-6 py-3 rounded-lg hover:bg-[#A02820] transition font-medium"
                >
                  {t('cookie.acceptAll')}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  {t('cookie.rejectAll')}
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex-1 border-2 border-[#7A0B18] text-[#7A0B18] px-6 py-3 rounded-lg hover:bg-[#FFF7ED] transition font-medium flex items-center justify-center space-x-2"
                >
                  <Settings size={18} />
                  <span>{t('cookie.customize')}</span>
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                {t('cookie.learnMore')}{' '}
                <a href="/privacy-policy" className="text-[#C4312E] underline hover:text-[#A02820]">
                  {t('cookie.privacyPolicy')}
                </a>
              </p>
            </div>
          ) : (
            // Settings Panel
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#7A0B18]">
                  {t('cookie.settingsTitle')}
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-[#7A0B18]">{t('cookie.necessary')}</h3>
                    <span className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded-full font-medium">
                      {t('cookie.alwaysActive')}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B4423]">{t('cookie.necessaryDesc')}</p>
                </div>

                {/* Functional Cookies */}
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-[#7A0B18]">{t('cookie.functional')}</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={(e) =>
                          setPreferences({ ...preferences, functional: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C4312E]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C4312E]"></div>
                    </label>
                  </div>
                  <p className="text-sm text-[#6B4423]">{t('cookie.functionalDesc')}</p>
                </div>

                {/* Analytics Cookies */}
                <div className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-[#7A0B18]">{t('cookie.analytics')}</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences({ ...preferences, analytics: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C4312E]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C4312E]"></div>
                    </label>
                  </div>
                  <p className="text-sm text-[#6B4423]">{t('cookie.analyticsDesc')}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 bg-[#C4312E] text-white px-6 py-3 rounded-lg hover:bg-[#A02820] transition font-medium"
                >
                  {t('cookie.savePreferences')}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 border-2 border-[#7A0B18] text-[#7A0B18] px-6 py-3 rounded-lg hover:bg-[#FFF7ED] transition font-medium"
                >
                  {t('cookie.acceptAll')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

