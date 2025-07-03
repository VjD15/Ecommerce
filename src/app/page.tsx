import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, Tag, Zap } from "lucide-react";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col">
      <section className="py-20 sm:py-32 md:py-40">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            PricePilot: Your Compass for
            <span className="relative inline-block px-2">
              <span className="relative text-primary">Smarter</span>
            </span>
            Shopping.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Discover products with prices that adapt to you. The more you explore, the better the deals become.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">
                Explore Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="bg-card py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Why PricePilot?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We're revolutionizing the way you shop online with features designed for you.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-headline text-xl font-semibold">Dynamic Pricing</h3>
              <p className="mt-2 text-base text-muted-foreground">Prices adjust based on your browsing habits. Loyal explorers get rewarded.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Tag className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-headline text-xl font-semibold">Curated Collections</h3>
              <p className="mt-2 text-base text-muted-foreground">Explore products organized into intuitive categories for easy discovery.</p>
            </div>
             <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m16.19 2-8.38 8.38-5.81 5.81 5.81 5.81 8.38-8.38 5.81-5.81-5.81-5.81Z"/><path d="m2.19 16.19 5.81-5.81"/><path d="m16.19 2.19 5.81 5.81"/></svg>
              </div>
              <h3 className="mt-5 font-headline text-xl font-semibold">Personalized Experience</h3>
              <p className="mt-2 text-base text-muted-foreground">Your journey shapes your prices. A truly unique shopping adventure awaits.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Featured Products</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Check out some of our most popular items.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
