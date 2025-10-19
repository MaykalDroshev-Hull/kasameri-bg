// components/OrderModal.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, MapPin, CreditCard, User, Phone, Mail, FileText, Tag, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore, CheckoutForm, OrderRequest, OrderItem } from '@/store/checkoutStore';
import SuccessSheet from './SuccessSheet';
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
  const [promoCode, setPromoCode] = useState(form.promoCode || '');
  const [promoApplied, setPromoApplied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  
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
    return unit === 'kg' ? t('common.perKg') : t('common.perL');
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

  const handlePromoCode = () => {
    if (promoCode === 'WELCOME5') {
      setPromoApplied(true);
      updateField('promoCode', promoCode);
    } else {
      setPromoApplied(false);
      updateField('promoCode', '');
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoApplied(false);
    updateField('promoCode', '');
  };

  const getTotals = () => {
    return calculateTotals(subtotal(), promoApplied ? promoCode : undefined);
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
        notes: form.notes || undefined,
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
        throw new Error('Order submission failed');
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
      
      // Show success
      setOrderResult(result);
      setShowSuccess(true);
      
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

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setOrderResult(null);
    onClose();
  };

  // Hide OrderModal when success is showing
  if (!isOpen) return null;
  if (showSuccess) {
    return (
      <SuccessSheet
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        orderResult={orderResult}
      />
    );
  }

  const totals = getTotals();

  return (
    <>
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

                    <div>
                      <label className="block text-sm font-medium text-[#7A0B18] mb-2">
                        {t('checkout.email')}
                      </label>
                      <input
                        type="email"
                        value={form.email || ''}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className={`w-full border rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="example@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {t(`checkout.errors.${errors.email}`)}
                        </p>
                      )}
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
                          <p className="text-xs text-gray-500 mt-1">Доставка с куриер Еконт (6.90 лв.)</p>
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
                          <p className="text-xs text-gray-500 mt-1">Доставка с наш транспорт (4.90 лв.)</p>
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

                  {/* Address (only if delivery) */}
                  {form.deliveryMethod !== 'pickup' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-[#7A0B18]">
                        Адрес за доставка
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#7A0B18] mb-2">
                            {t('checkout.street')} *
                          </label>
                          <input
                            type="text"
                            value={form.address?.street || ''}
                            onChange={(e) => handleAddressChange('street', e.target.value)}
                            className={`w-full border rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none ${
                              errors.street ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="ул. Витоша 1"
                          />
                          {errors.street && (
                            <p className="text-red-500 text-sm mt-1">
                              {t(`checkout.errors.${errors.street}`)}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#7A0B18] mb-2">
                            {t('checkout.city')} *
                          </label>
                          <input
                            type="text"
                            value={form.address?.city || ''}
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                            className={`w-full border rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none ${
                              errors.city ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="София"
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">
                              {t(`checkout.errors.${errors.city}`)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#7A0B18] mb-2">
                            {t('checkout.postcode')} *
                          </label>
                          <input
                            type="text"
                            value={form.address?.postcode || ''}
                            onChange={(e) => handleAddressChange('postcode', e.target.value)}
                            className={`w-full border rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none ${
                              errors.postcode ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="1000"
                            maxLength={4}
                          />
                          {errors.postcode && (
                            <p className="text-red-500 text-sm mt-1">
                              {t(`checkout.errors.${errors.postcode}`)}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#7A0B18] mb-2">
                            Вход/Етаж/Апартамент
                          </label>
                          <input
                            type="text"
                            value={form.address?.extra || ''}
                            onChange={(e) => handleAddressChange('extra', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none"
                            placeholder="Вход А, ет. 3, ап. 12"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Preferred Time */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#7A0B18] flex items-center space-x-2">
                      <Clock size={20} />
                      <span>{t('checkout.preferredTime')}</span>
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#7A0B18] mb-2">
                          {t('checkout.date')}
                        </label>
                        <input
                          type="date"
                          value={form.preferred?.dateISO || ''}
                          onChange={(e) => handlePreferredChange('dateISO', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#7A0B18] mb-2">
                          {t('checkout.slot')}
                        </label>
                        <select
                          value={form.preferred?.slot || '09-12'}
                          onChange={(e) => handlePreferredChange('slot', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none"
                        >
                          <option value="09-12">{t('checkout.timeSlots.09-12')}</option>
                          <option value="12-15">{t('checkout.timeSlots.12-15')}</option>
                          <option value="15-18">{t('checkout.timeSlots.15-18')}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#7A0B18] flex items-center space-x-2">
                      <CreditCard size={20} />
                      <span>{t('checkout.payment')}</span>
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={form.payment === 'cod'}
                          onChange={(e) => handleFieldChange('payment', e.target.value)}
                          className="text-[#C4312E] focus:ring-[#C4312E]"
                        />
                        <span className="text-[#6B4423]">{t('checkout.cod')}</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={form.payment === 'card'}
                          onChange={(e) => handleFieldChange('payment', e.target.value)}
                          className="text-[#C4312E] focus:ring-[#C4312E]"
                        />
                        <span className="text-[#6B4423]">{t('checkout.card')}</span>
                      </label>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#7A0B18] flex items-center space-x-2">
                      <Tag size={20} />
                      <span>{t('checkout.promo')}</span>
                    </h3>
                    
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none"
                        placeholder="WELCOME5"
                      />
                      {promoApplied ? (
                        <button
                          onClick={removePromoCode}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          {t('checkout.remove')}
                        </button>
                      ) : (
                        <button
                          onClick={handlePromoCode}
                          className="px-4 py-2 bg-[#C4312E] text-white rounded-lg hover:bg-[#A02820] transition"
                        >
                          {t('checkout.apply')}
                        </button>
                      )}
                    </div>
                    {promoApplied && (
                      <p className="text-green-600 text-sm flex items-center space-x-1">
                        <CheckCircle size={16} />
                        <span>5% отстъпка приложена</span>
                      </p>
                    )}
                  </div>

                  {/* Order Notes */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#7A0B18] flex items-center space-x-2">
                      <FileText size={20} />
                      <span>{t('checkout.notes')}</span>
                    </h3>
                    
                    <textarea
                      value={form.notes || ''}
                      onChange={(e) => handleFieldChange('notes', e.target.value)}
                      rows={3}
                      maxLength={280}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#C4312E] focus:outline-none resize-none"
                      placeholder="Допълнителни инструкции за доставката..."
                    />
                    <p className="text-xs text-gray-500">
                      {(form.notes || '').length}/280 символа
                    </p>
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
                              {item.qty} {item.unit} × {formatPrice(item.pricePerUnit)}{' '}
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
                      
                      <div className="flex justify-between">
                        <span className="text-[#6B4423]">{t('checkout.deliveryFee')}:</span>
                        <span className="font-medium">
                          {totals.deliveryFee === 0 ? 'Безплатно' : formatPrice(totals.deliveryFee)}
                        </span>
                      </div>
                      
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

                    {totals.deliveryFee > 0 && (
                      <p className="text-sm text-[#6B4423] text-center">
                        {t('checkout.freeDelivery')}
                      </p>
                    )}
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
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-[#C4312E] text-white rounded-lg hover:bg-[#A02820] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Обработка...</span>
                    </>
                  ) : (
                    <span>{t('checkout.placeOrder')}</span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default OrderModal;
