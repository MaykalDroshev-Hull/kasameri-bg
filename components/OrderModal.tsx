// components/OrderModal.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, MapPin, CreditCard, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore, CheckoutForm, OrderRequest, OrderItem } from '@/store/checkoutStore';
import { getEurConversion } from '@/utils/currency';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const { items, subtotal, clear } = useCartStore();
  const {
    form,
    errors,
    isSubmitting,
    updateField,
    updateAddress,
    updatePreferred,
    setError,
    clearError,
    validateForm,
    setSubmitting,
    normalizePhone,
    calculateTotals,
    setLastOrder,
    resetForm
  } = useCheckoutStore();

  const [activeTab, setActiveTab] = useState<'contact' | 'review'>('contact');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState('');
  
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && e.ctrlKey && activeTab === 'review') {
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeTab]);

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${t('common.currency')}`;
  };

  const getUnitLabel = (unit: string) => {
    if (unit === 'kg') return t('common.perKg');
    if (unit === 'l') return t('common.perL');
    if (unit === 'pack') return t('common.perPack');
    return unit;
  };

  const getUnitDisplayName = (unit: string) => {
    if (unit === 'kg') return 'кг';
    if (unit === 'l') return 'л';
    if (unit === 'pack') return t('common.box');
    return unit;
  };

  const handleFieldChange = (field: keyof CheckoutForm, value: any) => {
    updateField(field, value);
    clearError(field);
  };

  const handleAddressChange = (field: string, value: string) => {
    updateAddress(field as any, value);
    clearError(field);
  };

  const handlePreferredChange = (field: string, value: string) => {
    updatePreferred(field as any, value);
  };

  const getTotals = () => {
    return calculateTotals(subtotal());
  };

  const convertCartItemsToOrderItems = (): OrderItem[] => {
    return items.map(item => ({
      productId: item.id,
      name: t(item.nameKey),
      variety: item.varietyKey ? t(item.varietyKey) : undefined,
      qty: item.qty,
      unit: item.unit,
      pricePerUnit: item.pricePerUnit,
      lineTotal: item.qty * item.pricePerUnit
    }));
  };

  const generateIdempotencyKey = () => {
    return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setActiveTab('contact');
      return;
    }

    setSubmitting(true);

    try {
      const totals = getTotals();
      const orderItems = convertCartItemsToOrderItems();
      
      const orderRequest: OrderRequest = {
        idempotencyKey: generateIdempotencyKey(),
        locale: language,
        currency: 'BGN',
        customer: {
          fullName: form.fullName,
          phone: normalizePhone(form.phone),
          email: form.email || undefined
        },
        delivery: {
          method: form.deliveryMethod,
          address: form.deliveryMethod !== 'pickup' ? form.address : undefined,
          preferred: form.preferred,
          fee: totals.deliveryFee
        },
        payment: { method: form.payment },
        items: orderItems,
        subtotal: totals.subtotal,
        discount: totals.discount > 0 ? totals.discount : undefined,
        total: totals.total,
        createdAtISO: new Date().toISOString()
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderRequest),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Order submission failed:', errorData);
        alert(`Order failed: ${errorData.error || 'Unknown error'}\n${JSON.stringify(errorData.details || {}, null, 2)}`);
        throw new Error(`Order submission failed: ${errorData.error}`);
      }

      const result = await response.json();
      
      // Store order result
      setLastOrder({
        orderId: result.orderId,
        total: totals.total,
        deliveryMethod: form.deliveryMethod,
        items: orderItems,
        createdAt: new Date().toISOString()
      });

      // Clear cart and form
      clear();
      resetForm();
      
      // Show success message
      setSuccessOrderId(result.orderId);
      setShowSuccessMessage(true);
      
    } catch (error) {
      console.error('Order submission error:', error);
      setError('submit', 'failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const totals = getTotals();

  return (
    <>
      {/* Success Notification */}
      {showSuccessMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border-4 border-[#4C8F3A] overflow-hidden animate-bounce-in max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowSuccessMessage(false);
                onClose();
              }}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition z-10"
            >
              <X size={20} className="text-[#7A0B18]" />
            </button>
            
            <div className="bg-gradient-to-r from-[#4C8F3A] to-[#3D7230] p-6">
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-white">Поръчката е приета успешно! 🎉</h3>
              </div>
            </div>
            <div className="p-8 text-center">
              <p className="text-[#6B4423] text-lg mb-6 leading-relaxed">
                Благодарим Ви за доверието! Ще се свържем с Вас скоро за потвърждение на детайлите.
              </p>
              <button
                onClick={() => {
                  setShowSuccessMessage(false);
                  onClose();
                }}
                className="w-full bg-[#4C8F3A] text-white px-6 py-3 rounded-lg hover:bg-[#3D7230] transition font-medium text-lg"
              >
                Разбрах, благодаря!
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 transition-opacity"
          onClick={handleClose}
        />
        
        {/* Modal */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 id="order-modal-title" className="text-2xl font-bold text-[#7A0B18]">
                {t('checkout.title')}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                disabled={isSubmitting}
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 px-6 py-4 text-center font-medium transition ${
                  activeTab === 'contact'
                    ? 'text-[#7A0B18] border-b-2 border-[#7A0B18]'
                    : 'text-gray-500 hover:text-[#7A0B18]'
                }`}
              >
                {t('checkout.contact')}
              </button>
              <button
                onClick={() => setActiveTab('review')}
                className={`flex-1 px-6 py-4 text-center font-medium transition ${
                  activeTab === 'review'
                    ? 'text-[#7A0B18] border-b-2 border-[#7A0B18]'
                    : 'text-gray-500 hover:text-[#7A0B18]'
                }`}
              >
                {t('checkout.review')}
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[60vh]">
              {activeTab === 'contact' ? (
                <div className="p-6 space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#7A0B18] flex items-center space-x-2">
                      <User size={20} />
                      <span>Контактна информация</span>
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#7A0B18] mb-2">
                          {t('checkout.fullName')} *
                        </label>
                        <input
                          ref={firstInputRef}
                          type="text"
                          value={form.fullName}
                          onChange={(e) => handleFieldChange('fullName', e.target.value)}
                          className={`w-full border rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none ${
                            errors.fullName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder={t('checkout.fullName')}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">
                            {t(`checkout.errors.${errors.fullName}`)}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#7A0B18] mb-2">
                          {t('checkout.phone')} *
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => handleFieldChange('phone', e.target.value)}
                          className={`w-full border rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="+359 888 123 456"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {t(`checkout.errors.${errors.phone}`)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delivery Method */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#7A0B18] flex items-center space-x-2">
                      <MapPin size={20} />
                      <span>{t('checkout.deliveryMethod')}</span>
                    </h3>
                    
                    <div className="space-y-3">
                      <label className="flex items-start space-x-3 cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="econt_cod"
                          checked={form.deliveryMethod === 'econt_cod'}
                          onChange={(e) => handleFieldChange('deliveryMethod', e.target.value as any)}
                          className="mt-1 text-[#C4312E] focus:ring-[#C4312E]"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-[#7A0B18]">{t('checkout.econt_cod')}</span>
                          <p className="text-xs text-gray-500 mt-1">Доставка с куриер Еконт</p>
                          <p className="text-xs text-gray-400 mt-1 italic">Ще ви се обадим за детайли за доставката</p>
                        </div>
                      </label>
                      <label className="flex items-start space-x-3 cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="our_transport"
                          checked={form.deliveryMethod === 'our_transport'}
                          onChange={(e) => handleFieldChange('deliveryMethod', e.target.value as any)}
                          className="mt-1 text-[#C4312E] focus:ring-[#C4312E]"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-[#7A0B18]">{t('checkout.our_transport')}</span>
                          <p className="text-xs text-gray-500 mt-1">Доставка с наш транспорт</p>
                          <p className="text-xs text-gray-400 mt-1 italic">Ще ви се обадим за детайли за доставката</p>
                        </div>
                      </label>
                      <label className="flex items-start space-x-3 cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="pickup"
                          checked={form.deliveryMethod === 'pickup'}
                          onChange={(e) => handleFieldChange('deliveryMethod', e.target.value as any)}
                          className="mt-1 text-[#C4312E] focus:ring-[#C4312E]"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-[#7A0B18]">{t('checkout.pickup')}</span>
                          <p className="text-xs text-gray-500 mt-1">Лично вземане от с. Александрово (Безплатно)</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => handleFieldChange('consent', e.target.checked)}
                        className={`mt-1 text-[#C4312E] focus:ring-[#C4312E] ${
                          errors.consent ? 'border-red-500' : ''
                        }`}
                      />
                      <div>
                        <span className="text-[#6B4423]">{t('checkout.consent')}</span>
                        <p className="text-xs text-gray-500 mt-1">
                          {t('checkout.gdpr')}
                        </p>
                      </div>
                    </label>
                    {errors.consent && (
                      <p className="text-red-500 text-sm">
                        {t(`checkout.errors.${errors.consent}`)}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {/* Order Summary */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#7A0B18]">
                      {t('checkout.summary')}
                    </h3>
                    
                    <div className="bg-[#FFF7ED] rounded-lg p-4 space-y-3">
                      {items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-[#7A0B18]">
                              {t(item.nameKey)}
                              {item.varietyKey && (
                                <span className="text-sm text-[#6B4423] ml-2">
                                  ({t(item.varietyKey)})
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-[#6B4423]">
                              {item.qty} {getUnitDisplayName(item.unit)} × {formatPrice(item.pricePerUnit)}{' '}
                              <span className="text-xs">{getEurConversion(item.pricePerUnit)}</span>
                            </p>
                          </div>
                          <p className="font-bold text-[#7A0B18]">
                            {formatPrice(item.qty * item.pricePerUnit)}{' '}
                            <span className="text-xs font-normal">{getEurConversion(item.qty * item.pricePerUnit)}</span>
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#6B4423]">{t('checkout.subtotal')}:</span>
                        <span className="font-medium">
                          {formatPrice(totals.subtotal)}{' '}
                          <span className="text-xs">{getEurConversion(totals.subtotal)}</span>
                        </span>
                      </div>
                      
                      {totals.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>{t('checkout.discount')}:</span>
                          <span>
                            -{formatPrice(totals.discount)}{' '}
                            <span className="text-xs">{getEurConversion(totals.discount)}</span>
                          </span>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-300 pt-2">
                        <div className="flex justify-between text-lg font-bold text-[#7A0B18]">
                          <span>{t('checkout.total')}:</span>
                          <span>
                            {formatPrice(totals.total)}{' '}
                            <span className="text-sm font-normal">{getEurConversion(totals.total)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                disabled={isSubmitting}
              >
                {t('checkout.cancel')}
              </button>
              
              {activeTab === 'contact' ? (
                <button
                  onClick={() => setActiveTab('review')}
                  className="flex-1 px-4 py-3 bg-[#7A0B18] text-white rounded-lg hover:bg-[#5A0A12] transition"
                >
                  {t('checkout.review')} →
                </button>
              ) : (
                <>
                  {Object.keys(errors).length > 0 && (
                    <div className="flex-1 text-sm bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                      <p className="text-red-600 font-semibold mb-2">⚠️ Грешки във формата:</p>
                      <ul className="text-red-600 text-xs space-y-1 list-disc list-inside">
                        {errors.fullName && <li>Три имена: {t(`checkout.errors.${errors.fullName}`)}</li>}
                        {errors.phone && <li>Телефон: {t(`checkout.errors.${errors.phone}`)}</li>}
                        {errors.email && <li>Имейл: {t(`checkout.errors.${errors.email}`)}</li>}
                        {errors.consent && <li>Трябва да приемете условията</li>}
                      </ul>
                    </div>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-[#4C8F3A] text-white rounded-lg hover:bg-[#3D7230] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('checkout.submitting') : t('checkout.submit')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default OrderModal;
