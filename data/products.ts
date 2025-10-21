// data/products.ts
import { Product, Variety } from '@/types/product';

export const varieties: Record<string, Variety[]> = {
  apples: [
    { id: 'idared', nameKey: 'variety.idared', imageUrl: '/images/plc1.jpg' },
    { id: 'golden', nameKey: 'variety.golden', imageUrl: '/images/plc2.jpg' },
    { id: 'granny', nameKey: 'variety.granny', imageUrl: '/images/plc3.jpg' }
  ],
  cherries: [
    { id: 'bing', nameKey: 'variety.bing' },
    { id: 'van', nameKey: 'variety.van' },
    { id: 'kordia', nameKey: 'variety.kordia' }
  ]
};

export const products: Product[] = [
  {
    id: 'apples',
    nameKey: 'product.apples.name',
    descriptionKey: 'product.apples.desc',
    seasonKey: 'season.sep_nov',
    category: 'fruits',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&h=600&fit=crop',
    pricePerUnit: 2.80,
    unit: 'kg',
    rating: 5,
    premium: true,
    varieties: varieties.apples
  },
  {
    id: 'cherries',
    nameKey: 'product.cherries.name',
    descriptionKey: 'product.cherries.desc',
    seasonKey: 'season.may_jul',
    category: 'fruits',
    imageUrl: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&h=600&fit=crop',
    pricePerUnit: 5.90,
    unit: 'kg',
    rating: 5,
    premium: true,
    varieties: varieties.cherries
  },
  {
    id: 'pears',
    nameKey: 'product.pears.name',
    descriptionKey: 'product.pears.desc',
    seasonKey: 'season.aug_oct',
    category: 'fruits',
    imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=600&fit=crop',
    pricePerUnit: 3.20,
    unit: 'kg',
    rating: 5
  },
  {
    id: 'melons',
    nameKey: 'product.melons.name',
    descriptionKey: 'product.melons.desc',
    seasonKey: 'season.jul_aug',
    category: 'fruits',
    imageUrl: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=800&h=600&fit=crop',
    pricePerUnit: 1.80,
    unit: 'kg',
    rating: 5
  },
  {
    id: 'tomatoes',
    nameKey: 'product.tomatoes.name',
    descriptionKey: 'product.tomatoes.desc',
    seasonKey: 'season.jun_sep',
    category: 'vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=600&fit=crop',
    pricePerUnit: 2.40,
    unit: 'kg',
    rating: 5
  },
  {
    id: 'potatoes',
    nameKey: 'product.potatoes.name',
    descriptionKey: 'product.potatoes.desc',
    seasonKey: 'season.may_oct',
    category: 'vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&h=600&fit=crop',
    pricePerUnit: 1.50,
    unit: 'kg',
    rating: 5
  },
  {
    id: 'quinces',
    nameKey: 'product.quinces.name',
    descriptionKey: 'product.quinces.desc',
    seasonKey: 'season.oct_nov',
    category: 'fruits',
    imageUrl: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=800&h=600&fit=crop',
    pricePerUnit: 3.80,
    unit: 'kg',
    rating: 5
  },
  {
    id: 'apple_juice',
    nameKey: 'product.appleJuice.name',
    descriptionKey: 'product.appleJuice.desc',
    seasonKey: 'season.year_round',
    category: 'drinks',
    imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop',
    pricePerUnit: 3.50,
    unit: 'l',
    featured: true,
    rating: 5
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
