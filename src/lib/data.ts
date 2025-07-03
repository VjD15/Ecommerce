
import type { Product, Category } from './types';

let categories: Category[] = [
  { id: 'cat1', name: 'Electronics', description: 'Gadgets and devices' },
  { id: 'cat2', name: 'Apparel', description: 'Clothing and accessories' },
  { id: 'cat3', name: 'Home Goods', description: 'Items for your home' },
  { id: 'cat4', name: 'Books', description: 'Digital and physical books' },
];

let products: Product[] = [
  {
    id: 'prod1',
    name: 'Quantum Laptop',
    description: 'A sleek, powerful laptop for all your computing needs. Features a quantum-entangled processor for instantaneous calculations.',
    price: 108000,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    categoryId: 'cat1',
    available: true,
    featured: true,
  },
  {
    id: 'prod2',
    name: 'Chrono Watch',
    description: 'A stylish watch that not only tells time but also your potential future. Please use responsibly.',
    price: 29000,
    images: ['https://placehold.co/600x400.png'],
    categoryId: 'cat1',
    available: true,
  },
  {
    id: 'prod3',
    name: 'Gravity Hoodie',
    description: 'A comfortable hoodie made from moon-rock fibers that lightly repels gravity, making you feel lighter.',
    price: 7500,
    images: ['https://placehold.co/600x400.png'],
    categoryId: 'cat2',
    available: true,
    featured: true,
  },
  {
    id: 'prod4',
    name: 'Singularity Mug',
    description: 'A coffee mug that contains a micro-singularity. Keeps your coffee hot for an eternity.',
    price: 2500,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    categoryId: 'cat3',
    available: true,
  },
  {
    id: 'prod5',
    name: 'Neural T-Shirt',
    description: 'A t-shirt with a neural network print that subtly changes based on your mood.',
    price: 3750,
    images: ['https://placehold.co/600x400.png'],
    categoryId: 'cat2',
    available: false,
    featured: true,
  },
  {
    id: 'prod6',
    name: 'Infinite Codex',
    description: 'A book that contains every story ever written and ever will be written. Requires a subscription.',
    price: 16500,
    images: ['https://placehold.co/600x400.png'],
    categoryId: 'cat4',
    available: true,
  },
  {
    id: 'prod7',
    name: 'Echo Headphones',
    description: 'Listen to music from parallel universes. Sound quality may vary depending on interdimensional drift.',
    price: 20800,
    images: ['https://placehold.co/600x400.png'],
    categoryId: 'cat1',
    available: true,
    featured: true,
  },
  {
    id: 'prod8',
    name: 'Smart Sneakers',
    description: 'These sneakers learn your walking style and optimize cushioning for maximum comfort and energy return.',
    price: 13300,
    images: ['https://placehold.co/600x400.png'],
    categoryId: 'cat2',
    available: true,
  },
];

export const getProducts = (): Product[] => products;
export const getCategories = (): Category[] => categories;

export const getProductById = (id: string): Product | undefined => products.find(p => p.id === id);
export const getCategoryById = (id: string): Category | undefined => categories.find(c => c.id === id);

export const getFeaturedProducts = (): Product[] => products.filter(p => p.featured);

// Admin functions - NOTE: These modify the in-memory arrays.
export const addProduct = (product: Omit<Product, 'id' | 'featured' | 'available' | 'images' | 'price'> & {images: string, price: number}) => {
  const newProduct: Product = {
    ...product,
    id: `prod${Date.now()}`,
    images: product.images.split(',').map(url => url.trim()),
    price: Number(product.price),
    featured: false,
    available: true,
  };
  products.unshift(newProduct);
  return newProduct;
};

export const updateProduct = (id: string, data: Partial<Omit<Product, 'id' | 'images'>> & {images?: string}) => {
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) return undefined;

  const existingProduct = products[productIndex];
  
  const updatedProduct = { 
      ...existingProduct, 
      ...data,
      price: data.price ? Number(data.price) : existingProduct.price,
      images: typeof data.images === 'string' ? data.images.split(',').map(url => url.trim()) : existingProduct.images
  };

  products[productIndex] = updatedProduct;
  return updatedProduct;
};

export const deleteProduct = (id: string) => {
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex > -1) {
        products.splice(productIndex, 1);
    }
};

export const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
        ...category,
        id: `cat${Date.now()}`,
    };
    categories.unshift(newCategory);
    return newCategory;
};
