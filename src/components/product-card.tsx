
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { DynamicPrice } from './dynamic-price';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Eye } from 'lucide-react';
import { AddToCartButton } from './add-to-cart-button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="group block overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="product image"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        {!product.available && (
          <Badge variant="destructive" className="mb-2">Out of Stock</Badge>
        )}
        <CardTitle className="font-headline text-lg tracking-tight">
          <Link href={`/products/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        <div className="mt-2">
          <DynamicPrice basePrice={product.price} productId={product.id} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button asChild size="sm" variant="outline">
          <Link href={`/products/${product.id}`}>
            <Eye className="mr-2 h-4 w-4" /> View
          </Link>
        </Button>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
