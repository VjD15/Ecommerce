
'use client';

import { Button } from './ui/button';
import type { ButtonProps } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';

interface AddToCartButtonProps {
    product: Product;
    size?: ButtonProps['size'];
    className?: string;
    variant?: ButtonProps['variant'];
}

export function AddToCartButton({ product, size = 'sm', className, variant }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addItem(product);
  }

  return (
    <Button size={size} disabled={!product.available} onClick={handleAddToCart} className={className} variant={variant}>
      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
    </Button>
  );
}
