
import { getProductById, getCategoryById } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DynamicPrice } from "@/components/dynamic-price";
import { Edit } from "lucide-react";
import Link from 'next/link';
import { getSession } from "@/lib/auth";
import { AddToCartButton } from "@/components/add-to-cart-button";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }
  
  const category = getCategoryById(product.categoryId);
  const { user } = await getSession();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square overflow-hidden rounded-lg border">
                    <Image
                      src={src}
                      alt={`${product.name} image ${index + 1}`}
                      width={800}
                      height={800}
                      className="h-full w-full object-cover"
                      data-ai-hint="product image"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            {category && (
               <Link href={`/search?category=${category.id}`}>
                <Badge variant="outline" className="hover:bg-accent">{category.name}</Badge>
               </Link>
            )}
             {!product.available && (
                <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>
          <h1 className="mt-4 font-headline text-3xl font-bold tracking-tight lg:text-4xl">
            {product.name}
          </h1>
          
          <Separator className="my-6" />
          
          <div className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground">
             <p>{product.description}</p>
          </div>
          
          <div className="mt-auto pt-8">
             <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Your Price:</p>
                    <DynamicPrice basePrice={product.price} productId={product.id} />
                </div>
                {user?.role === 'admin' && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/products/${product.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                  </Button>
                )}
             </div>
            <AddToCartButton product={product} size="lg" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
