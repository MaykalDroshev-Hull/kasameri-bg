// store/checkoutStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type PaymentMethod = 'cod' | 'card';
export type DeliveryMethod = 'delivery' | 'pickup';

export type CheckoutForm = {
  fullName: string;
  phone: string;        // store normalized +359…
  email?: string;
  deliveryMethod: DeliveryMethod;
  address?: {
    street: string;
    city: string;
    postcode: string;
    extra?: string;     // entrance/floor/apartment
  };
  preferred?: {
    dateISO?: string;   // YYYY-MM-DD
    slot?: '09-12' | '12-15' | '15-18';
  };
  payment: PaymentMethod;
  notes?: string;
  consent: boolean;
  promoCode?: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  variety?: string;
  qty: number;          // decimals allowed
  unit: 'kg' | 'l';
  pricePerUnit: number;
  lineTotal: number;
};

export type OrderRequest = {
  idempotencyKey: string;     // uuid to avoid dupes
  locale: 'bg' | 'en';
  currency: 'BGN';            // configurable
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };
  delivery: {
    method: DeliveryMethod;
    address?: { street: string; city: string; postcode: string; extra?: string };
    preferred?: { dateISO?: string; slot?: string };
    fee: number;
  };
  payment: { method: PaymentMethod };
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  total: number;
  notes?: string;
  createdAtISO: string;
};

export type CheckoutState = {
  form: CheckoutForm;
  isSubmitting: boolean;
  errors: Record<string, string>;
  lastOrder?: {
    orderId: string;
    total: number;
    deliveryMethod: DeliveryMethod;
    items: OrderItem[];
    createdAt: string;
  };
  
  // Actions
  updateField: <K extends keyof CheckoutForm>(field: K, value: CheckoutForm[K]) => void;
  updateAddress: <K extends keyof NonNullable<CheckoutForm['address']>>(field: K, value: NonNullable<CheckoutForm['address']>[K]) => void;
  updatePreferred: <K extends keyof NonNullable<CheckoutForm['preferred']>>(field: K, value: NonNullable<CheckoutForm['preferred']>[K]) => void;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  clearErrors: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setLastOrder: (order: CheckoutState['lastOrder']) => void;
  resetForm: () => void;
  validateForm: () => boolean;
  normalizePhone: (phone: string) => string;
  calculateTotals: (subtotal: number, promoCode?: string) => { subtotal: number; deliveryFee: number; discount: number; total: number };
};

const initialForm: CheckoutForm = {
  fullName: '',
  phone: '',
  email: '',
  deliveryMethod: 'delivery',
  address: {
    street: '',
    city: 'София',
    postcode: '',
    extra: ''
  },
  preferred: {
    dateISO: '',
    slot: '09-12'
  },
  payment: 'cod',
  notes: '',
  consent: false,
  promoCode: ''
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      form: initialForm,
      isSubmitting: false,
      errors: {},
      lastOrder: undefined,

      updateField: (field, value) => {
        set(state => ({
          form: { ...state.form, [field]: value }
        }));
      },

      updateAddress: (field, value) => {
        set(state => ({
          form: {
            ...state.form,
            address: { 
              ...state.form.address,
              [field]: value 
            } as CheckoutForm['address']
          }
        }));
      },

      updatePreferred: (field, value) => {
        set(state => ({
          form: {
            ...state.form,
            preferred: { 
              ...state.form.preferred,
              [field]: value 
            } as CheckoutForm['preferred']
          }
        }));
      },

      setError: (field, error) => {
        set(state => ({
          errors: { ...state.errors, [field]: error }
        }));
      },

      clearError: (field) => {
        set(state => {
          const newErrors = { ...state.errors };
          delete newErrors[field];
          return { errors: newErrors };
        });
      },

      clearErrors: () => {
        set({ errors: {} });
      },

      setSubmitting: (isSubmitting) => {
        set({ isSubmitting });
      },

      setLastOrder: (order) => {
        set({ lastOrder: order });
      },

      resetForm: () => {
        set({ form: initialForm, errors: {} });
      },

      normalizePhone: (phone) => {
        // Remove all non-digit characters
        const digits = phone.replace(/\D/g, '');
        
        // Handle Bulgarian phone numbers
        if (digits.startsWith('0')) {
          return '+359' + digits.substring(1);
        } else if (digits.startsWith('359')) {
          return '+' + digits;
        } else if (digits.startsWith('+359')) {
          return digits;
        }
        
        return phone; // Return original if can't normalize
      },

      calculateTotals: (subtotal, promoCode) => {
        const { form } = get();
        
        // Calculate discount
        let discount = 0;
        if (promoCode === 'WELCOME5') {
          discount = subtotal * 0.05; // 5% discount
        }
        
        // Calculate delivery fee
        let deliveryFee = 0;
        if (form.deliveryMethod === 'delivery') {
          const freeDeliveryThreshold = 40.00;
          if (subtotal < freeDeliveryThreshold) {
            deliveryFee = 4.90; // BGN
          }
        }
        
        const total = subtotal - discount + deliveryFee;
        
        return {
          subtotal,
          deliveryFee,
          discount,
          total
        };
      },

      validateForm: () => {
        const { form, setError, clearError, normalizePhone } = get();
        let isValid = true;

        // Clear previous errors
        get().clearErrors();

        // Full name validation
        if (!form.fullName.trim()) {
          setError('fullName', 'required');
          isValid = false;
        } else if (form.fullName.trim().split(' ').length < 2) {
          setError('fullName', 'minWords');
          isValid = false;
        }

        // Phone validation
        if (!form.phone.trim()) {
          setError('phone', 'required');
          isValid = false;
        } else {
          const normalized = normalizePhone(form.phone);
          if (!normalized.startsWith('+359') || normalized.length !== 13) {
            setError('phone', 'invalid');
            isValid = false;
          }
        }

        // Email validation (optional but validate if present)
        if (form.email && form.email.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(form.email)) {
            setError('email', 'invalid');
            isValid = false;
          }
        }

        // Address validation (only if delivery)
        if (form.deliveryMethod === 'delivery') {
          if (!form.address?.street?.trim()) {
            setError('street', 'required');
            isValid = false;
          }
          if (!form.address?.city?.trim()) {
            setError('city', 'required');
            isValid = false;
          }
          if (!form.address?.postcode?.trim()) {
            setError('postcode', 'required');
            isValid = false;
          } else if (!/^\d{4}$/.test(form.address.postcode)) {
            setError('postcode', 'invalid');
            isValid = false;
          }
        }

        // Consent validation
        if (!form.consent) {
          setError('consent', 'required');
          isValid = false;
        }

        return isValid;
      }
    }),
    {
      name: 'checkout-form-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ form: state.form }), // Only persist form data
    }
  )
);
