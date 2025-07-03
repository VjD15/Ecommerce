
'use client';

import { createContext, useState, useContext, useEffect, ReactNode, createElement } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useToast } from './use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const items = localStorage.getItem('cartItems');
      if (items) {
        setCartItems(JSON.parse(items));
      }
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
      setCartItems([]);
    }
  }, []);
  
  const syncLocalStorage = (items: CartItem[]) => {
      try {
        localStorage.setItem('cartItems', JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save cart items to localStorage", error);
      }
  }

  const addItem = (item: Product) => {
    setCartItems(prevItems => {
      const exist = prevItems.find((x) => x.id === item.id);
      let newItems;
      if (exist) {
        newItems = prevItems.map((x) =>
          x.id === item.id ? { ...exist, quantity: exist.quantity + 1 } : x
        );
      } else {
        newItems = [...prevItems, { ...item, quantity: 1 }];
      }
      syncLocalStorage(newItems);
      return newItems;
    });
    toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
    });
  };

  const removeItem = (itemId: string) => {
    setCartItems(prevItems => {
        const newItems = prevItems.filter((x) => x.id !== itemId);
        syncLocalStorage(newItems);
        return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    syncLocalStorage([]);
  };

  return createElement(
    CartContext.Provider,
    { value: { cartItems, addItem, removeItem, clearCart } },
    children
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
