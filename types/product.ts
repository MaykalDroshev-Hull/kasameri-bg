// types/product.ts
export type Unit = 'kg' | 'l';
export type Category = 'fruits' | 'vegetables' | 'drinks';

export type Variety = {
  id: string;
  nameKey: string; // e.g., 'variety.idared'
  imageUrl?: string; // Optional image for the variety
};

export type Product = {
  id: string;
  nameKey: string;          // 'product.apples.name'
  descriptionKey: string;   // 'product.apples.desc'
  seasonKey: string;        // 'season.sep_nov'
  category: Category;
  imageUrl: string;         // Unsplash
  pricePerUnit: number;     // number only; currency via i18n
  unit: Unit;               // kg for produce, l for apple juice
  featured?: boolean;       // apple juice 'RECOMMENDED'
  premium?: boolean;        // apples & cherries
  rating?: number;         // default 5
  varieties?: Variety[];    // only for apples, cherries
  comingSoon?: boolean;     // vinegar
};

export type CartItem = {
  id: string;           // productId
  nameKey: string;
  varietyKey?: string;
  unit: Unit;
  pricePerUnit: number;
  qty: number;          // decimals allowed
  notes?: string;
  imageUrl: string;
};

export type CartState = {
  items: CartItem[];
  add(item: Omit<CartItem, 'qty'> & { qty: number }): void;
  updateQty(id: string, qty: number, varietyKey?: string, notes?: string): void;
  updateNotes(id: string, varietyKey?: string, oldNotes?: string, newNotes?: string): void;
  remove(id: string, varietyKey?: string, notes?: string): void;
  clear(): void;
  subtotal(): number;
};
