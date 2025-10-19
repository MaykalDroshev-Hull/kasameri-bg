// components/SuccessSheet.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, MessageCircle, Copy, X, Phone, Facebook } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCheckoutStore, OrderRequest } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { sendViaViber, sendViaMessenger, copyToClipboard, buildOrderTextBG, buildOrderTextEN } from '@/utils/viber';
import Toast from './Toast';

interface SuccessSheetProps {
  isOpen: boolean;
  onClose: () => void;
  orderResult: {
    orderId: string;
    message?: string;
  };
}

const SuccessSheet: React.FC<SuccessSheetProps> = ({ isOpen, onClose, orderResult }) => {
  const { t, language } = useLanguage();
  const { lastOrder, form } = useCheckoutStore();
  const [copied, setCopied] = useState(false);
  const [orderText, setOrderText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Build order text when sheet opens
  useEffect(() => {
    if (isOpen && lastOrder) {
      const orderPayload: OrderRequest = {
        idempotencyKey: '',
        locale: language,
        currency: 'BGN',
        customer: {
          fullName: form.fullName,
          phone: form.phone,
          email: form.email
        },
        delivery: {
          method: form.deliveryMethod,
          address: form.deliveryMethod !== 'pickup' ? form.address : undefined,
          preferred: form.preferred,
          fee: 0 // will be calculated
        },
        payment: { method: form.payment },
        items: lastOrder.items,
        subtotal: lastOrder.total,
        discount: 0,
        total: lastOrder.total,
        notes: form.notes,
        createdAtISO: lastOrder.createdAt
      };

      const text = language === 'bg'
        ? buildOrderTextBG(orderPayload, orderResult.orderId)
        : buildOrderTextEN(orderPayload, orderResult.orderId);
      
      setOrderText(text);
    }
  }, [isOpen, lastOrder, orderResult, form, language]);

  if (!isOpen || !lastOrder) return null;

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${t('common.currency')}`;
  };

  // Automatically open Viber when success sheet opens
  useEffect(() => {
    if (isOpen && orderText) {
      // Auto-copy to clipboard
      copyToClipboard(orderText);
      
      // Show toast immediately
      setToastMessage(language === 'bg' 
        ? '✅ Поръчката е копирана и ще бъдете пренасочени към Viber' 
        : '✅ Order copied and you will be redirected to Viber');
      setShowToast(true);
      
      // Wait 1 second then open Viber directly to the specific contact
      setTimeout(() => {
        // Open directly to +447471887453 without choosing contact
        window.location.href = 'viber://chat?number=%2B447471887453';
      }, 1000);
    }
  }, [isOpen, orderText, language]);

  const handleSendViber = () => {
    // Copy to clipboard first
    copyToClipboard(orderText);
    
    // Open directly to +447471887453 without choosing contact
    window.location.href = 'viber://chat?number=%2B447471887453';
    
    setToastMessage(language === 'bg' 
      ? '✅ Отваря се Viber...' 
      : '✅ Opening Viber...');
    setShowToast(true);
  };

  const handleSendMessenger = () => {
    const encodedMessage = encodeURIComponent(orderText);
    window.open(`https://m.me/BlameH1M?text=${encodedMessage}`, '_blank');
    
    setToastMessage(language === 'bg' 
      ? '✅ Отваря се Messenger...' 
      : '✅ Opening Messenger...');
    setShowToast(true);
  };

  const handleCopyText = async () => {
    const success = await copyToClipboard(orderText);
    if (success) {
      setCopied(true);
      setToastMessage(language === 'bg' ? '✅ Поръчката е копирана!' : '✅ Order copied!');
      setShowToast(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleNewOrder = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Success Sheet */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <CheckCircle size={32} className="text-green-500" />
              <h2 className="text-2xl font-bold text-[#7A0B18]">
                {t('checkout.successTitle')}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[60vh] p-6 space-y-6">
            {/* Success Message */}
            <div className="text-center">
              <p className="text-lg text-[#6B4423] mb-4">
                {t('success.message')}
              </p>
              <div className="bg-[#FFF7ED] rounded-lg p-4 inline-block">
                <p className="text-sm text-[#6B4423] mb-2">
                  {t('success.orderNumber')}:
                </p>
                <p className="text-2xl font-bold text-[#7A0B18]">
                  {orderResult.orderId}
                </p>
              </div>
            </div>

            {/* Messaging Instructions */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-5">
              <div className="flex items-start space-x-3 mb-3">
                <MessageCircle className="text-purple-600 flex-shrink-0 mt-1" size={24} />
                <div className="flex-1">
                  <h4 className="font-bold text-[#7A0B18] mb-2 text-lg">
                    {language === 'bg' 
                      ? '📱 Автоматично пренасочване към Viber' 
                      : '📱 Automatic redirect to Viber'}
                  </h4>
                  <p className="text-sm text-[#6B4423] leading-relaxed">
                    {language === 'bg' 
                      ? 'Поръчката ви е копирана и Viber ще се отвори директно на +447471887453. Просто поставете (Paste/Ctrl+V) текста в чата и натиснете Изпрати.' 
                      : 'Your order has been copied and Viber will open directly to +447471887453. Just paste (Paste/Ctrl+V) the text in the chat and press Send.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-white rounded-lg p-3 mt-3">
                <div className="text-sm">
                  <p className="font-medium text-[#7A0B18]">
                    {language === 'bg' ? 'Изпратете на:' : 'Send to:'}
                  </p>
                  <p className="text-[#6B4423] flex items-center gap-2 mt-1">
                    <Phone size={14} className="text-[#7360F2]" />
                    <span>+447471887453</span>
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'bg' ? 'или използвайте бутоните отдолу' : 'or use buttons below'}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7A0B18]">
                Обобщение на поръчката
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#6B4423]">Обща сума:</span>
                  <span className="font-bold text-[#7A0B18]">
                    {formatPrice(lastOrder.total)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[#6B4423]">Метод на доставка:</span>
                  <span className="font-medium">
                    {lastOrder.deliveryMethod === 'econt_cod' ? t('checkout.econt_cod') 
                      : lastOrder.deliveryMethod === 'our_transport' ? t('checkout.our_transport')
                      : t('checkout.pickup')}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[#6B4423]">Дата на поръчката:</span>
                  <span className="font-medium">
                    {new Date(lastOrder.createdAt).toLocaleDateString(language === 'bg' ? 'bg-BG' : 'en-US')}
                  </span>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7A0B18]">
                {t('checkout.items')}
              </h3>
              
              <div className="bg-[#FFF7ED] rounded-lg p-4 space-y-3">
                {lastOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-[#7A0B18]">
                        {item.name}
                        {item.variety && (
                          <span className="text-sm text-[#6B4423] ml-2">
                            ({item.variety})
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-[#6B4423]">
                        {item.qty} {item.unit} × {formatPrice(item.pricePerUnit)}
                      </p>
                    </div>
                    <p className="font-bold text-[#7A0B18]">
                      {formatPrice(item.lineTotal)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Text Preview */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#7A0B18]">
                Текст на поръчката:
              </h4>
              <div className="bg-gray-100 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                {orderText}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 space-y-3">
            {/* Primary Messaging Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSendViber}
                className="px-4 py-3 bg-[#7360F2] text-white rounded-lg hover:bg-[#5A4DC2] transition flex items-center justify-center space-x-2 shadow-md"
              >
                <Phone size={18} />
                <span>Viber</span>
              </button>
              
              <button
                onClick={handleSendMessenger}
                className="px-4 py-3 bg-[#0084FF] text-white rounded-lg hover:bg-[#0073E6] transition flex items-center justify-center space-x-2 shadow-md"
              >
                <Facebook size={18} />
                <span>Messenger</span>
              </button>
            </div>

            {/* Copy Action */}
            <button
              onClick={handleCopyText}
              className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-2"
            >
              <Copy size={18} />
              <span>{copied ? '✓ ' + t('viber.copied') : t('success.copyText')}</span>
            </button>

            {/* Secondary Action */}
            <button
              onClick={handleNewOrder}
              className="w-full px-4 py-3 bg-[#C4312E] text-white rounded-lg hover:bg-[#A02820] transition font-medium"
            >
              {t('checkout.newOrder')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default SuccessSheet;
