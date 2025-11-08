// store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, CartState } from '@/types/product';

const generateCartItemId = (id: string, varietyKey?: string, notes?: string): string => {
  return `${id}${varietyKey ? `_${varietyKey}` : ''}${notes ? `_${notes.slice(0, 10)}` : ''}`;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isModalOpen: false,
      
      setModalOpen: (isOpen: boolean) => {
        set({ isModalOpen: isOpen });
      },
      
      add: (item) => {
        const { items } = get();
        const cartItemId = generateCartItemId(item.id, item.varietyKey, item.notes);
        
        // Check if item already exists (same product, variety, and notes)
        const existingItemIndex = items.findIndex(existingItem => 
          existingItem.id === item.id && 
          existingItem.varietyKey === item.varietyKey && 
          existingItem.notes === item.notes
        );
        
        if (existingItemIndex !== -1) {
          // Merge quantities
          const updatedItems = [...items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            qty: updatedItems[existingItemIndex].qty + item.qty
          };
          set({ items: updatedItems });
        } else {
          // Add new item
          set({ items: [...items, item] });
        }
      },
      
      updateQty: (id, qty, varietyKey, notes) => {
        const { items } = get();
        const updatedItems = items.map(item => {
          if (item.id === id && item.varietyKey === varietyKey && item.notes === notes) {
            return { ...item, qty };
          }
          return item;
        });
        set({ items: updatedItems });
      },
      
      updateNotes: (id, varietyKey, oldNotes, newNotes) => {
        const { items } = get();
        const updatedItems = items.map(item => {
          if (item.id === id && item.varietyKey === varietyKey && item.notes === oldNotes) {
            return { ...item, notes: newNotes };
          }
          return item;
        });
        set({ items: updatedItems });
      },
      
      remove: (id, varietyKey, notes) => {
        const { items } = get();
        const filteredItems = items.filter(item => 
          !(item.id === id && item.varietyKey === varietyKey && item.notes === notes)
        );
        set({ items: filteredItems });
      },
      
      clear: () => {
        set({ items: [] });
      },
      
      subtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.qty * item.pricePerUnit), 0);
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
