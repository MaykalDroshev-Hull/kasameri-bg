// components/SuccessSheet.tsx
'use client';

import React from 'react';
import { CheckCircle, Download, Printer, ShoppingCart, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCheckoutStore } from '@/store/checkoutStore';
import { getEurConversion } from '@/utils/currency';

interface SuccessSheetProps {
  isOpen: boolean;
  onClose: () => void;
  orderResult: {
    orderId: string;
    etaDays: number;
  };
}

const SuccessSheet: React.FC<SuccessSheetProps> = ({ isOpen, onClose, orderResult }) => {
  const { t } = useLanguage();
  const { lastOrder } = useCheckoutStore();

  if (!isOpen || !lastOrder) return null;

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ${t('common.currency')}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Stub action - in real app, this would generate and download PDF
    alert('PDF download functionality would be implemented here');
  };

  const handleNewOrder = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 overflow-hidden">
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
                {t('checkout.successText')}
              </p>
              <div className="bg-[#FFF7ED] rounded-lg p-4 inline-block">
                <p className="text-sm text-[#6B4423] mb-2">
                  {t('checkout.orderId')}:
                </p>
                <p className="text-2xl font-bold text-[#7A0B18]">
                  {orderResult.orderId}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7A0B18]">
                Детайли на поръчката
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#6B4423]">Обща сума:</span>
                  <span className="font-bold text-[#7A0B18]">
                    {formatPrice(lastOrder.total)}{' '}
                    <span className="text-sm font-normal">{getEurConversion(lastOrder.total)}</span>
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[#6B4423]">Метод на доставка:</span>
                  <span className="font-medium">
                    {lastOrder.deliveryMethod === 'delivery' ? t('checkout.delivery') : t('checkout.pickup')}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[#6B4423]">Очаквано време:</span>
                  <span className="font-medium">
                    {orderResult.etaDays} {orderResult.etaDays === 1 ? 'ден' : 'дни'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-[#6B4423]">Дата на поръчката:</span>
                  <span className="font-medium">
                    {new Date(lastOrder.createdAt).toLocaleDateString('bg-BG')}
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
                        {item.qty} {item.unit} × {formatPrice(item.pricePerUnit)}{' '}
                        <span className="text-xs">{getEurConversion(item.pricePerUnit)}</span>
                      </p>
                    </div>
                    <p className="font-bold text-[#7A0B18]">
                      {formatPrice(item.lineTotal)}{' '}
                      <span className="text-xs font-normal">{getEurConversion(item.lineTotal)}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-[#7A0B18] mb-2">
                Информация за доставката
              </h4>
              <p className="text-sm text-[#6B4423]">
                Ще се свържем с вас по телефон за потвърждение на поръчката и координация на доставката.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex space-x-3 p-6 border-t border-gray-200">
            <button
              onClick={handlePrint}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-2"
            >
              <Printer size={16} />
              <span>{t('checkout.print')}</span>
            </button>
            
            <button
              onClick={handleDownloadPDF}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center space-x-2"
            >
              <Download size={16} />
              <span>PDF</span>
            </button>
            
            <button
              onClick={handleNewOrder}
              className="flex-1 px-4 py-3 bg-[#C4312E] text-white rounded-lg hover:bg-[#A02820] transition flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={16} />
              <span>{t('checkout.newOrder')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessSheet;
