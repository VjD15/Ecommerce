
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  available: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // In a real app, this would be a hash
  role: 'admin' | 'customer';
}

export interface CartItem extends Product {
  quantity: number;
}
