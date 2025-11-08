// data/products.ts
import { Product, Variety } from '@/types/product';

export const varieties: Record<string, Variety[]> = {
  apples: [
    { id: 'golden', nameKey: 'variety.golden', imageUrl: '/apple-sorts/gold-precious.jpg' },
    { id: 'florina', nameKey: 'variety.florina', imageUrl: '/apple-sorts/florina.jpg' },
    { id: 'jonagold', nameKey: 'variety.jonagold', imageUrl: '/apple-sorts/johna-gold.jpg' },
    { id: 'melrose', nameKey: 'variety.melrose', imageUrl: '/apple-sorts/mellrouse,jpg.jpg' }
  ]
};

export const products: Product[] = [
  {
    id: 'apples',
    nameKey: 'product.apples.name',
    descriptionKey: 'product.apples.desc',
    seasonKey: 'season.sep_nov',
    category: 'fruits',
    imageUrl: '/apple-sorts/florina.jpg',
    pricePerUnit: 3.50, // 1st quality price (will be overridden by quality selection)
    unit: 'kg',
    rating: 5,
    premium: true,
    varieties: varieties.apples
  },
  {
    id: 'apple_juice',
    nameKey: 'product.appleJuice.name',
    descriptionKey: 'product.appleJuice.desc',
    seasonKey: 'season.year_round',
    category: 'drinks',
    imageUrl: '/products-section/juice.jpg',
    pricePerUnit: 10.00,
    unit: 'pack',
    premium: true,
    rating: 5
  },
  {
    id: 'potatoes',
    nameKey: 'product.potatoes.name',
    descriptionKey: 'product.potatoes.desc',
    seasonKey: 'season.sep_mar',
    category: 'vegetables',
    imageUrl: '/products-section/potatoes.jpg',
    pricePerUnit: 1.30,
    unit: 'kg',
    rating: 5
  },
  {
    id: 'cherries',
    nameKey: 'product.cherries.name',
    descriptionKey: 'product.cherries.desc',
    seasonKey: 'season.may_jul',
    category: 'fruits',
    imageUrl: '/products-section/cherries.jpg',
    pricePerUnit: 5.90,
    unit: 'kg',
    rating: 5,
    inStock: false
  },
  {
    id: 'pears',
    nameKey: 'product.pears.name',
    descriptionKey: 'product.pears.desc',
    seasonKey: 'season.aug_oct',
    category: 'fruits',
    imageUrl: '/products-section/pears.jpg',
    pricePerUnit: 3.20,
    unit: 'kg',
    rating: 5,
    inStock: false
  },
  {
    id: 'melons',
    nameKey: 'product.melons.name',
    descriptionKey: 'product.melons.desc',
    seasonKey: 'season.jul_sep',
    category: 'fruits',
    imageUrl: '/products-section/melons.jpg',
    pricePerUnit: 1.80,
    unit: 'kg',
    rating: 5,
    inStock: false
  },
  {
    id: 'watermelons',
    nameKey: 'product.watermelons.name',
    descriptionKey: 'product.watermelons.desc',
    seasonKey: 'season.jul_sep',
    category: 'fruits',
    imageUrl: '/products-section/watermelons.png',
    pricePerUnit: 1.90,
    unit: 'kg',
    rating: 5,
    inStock: false
  },
  {
    id: 'tomatoes',
    nameKey: 'product.tomatoes.name',
    descriptionKey: 'product.tomatoes.desc',
    seasonKey: 'season.jun_sep',
    category: 'vegetables',
    imageUrl: '/products-section/tomatoes.jpg',
    pricePerUnit: 2.40,
    unit: 'kg',
    rating: 5,
    inStock: false
  },
  {
    id: 'quinces',
    nameKey: 'product.quinces.name',
    descriptionKey: 'product.quinces.desc',
    seasonKey: 'season.sep_oct',
    category: 'fruits',
    imageUrl: '/products-section/quinces.jpg',
    pricePerUnit: 3.80,
    unit: 'kg',
    rating: 5,
    inStock: false
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
