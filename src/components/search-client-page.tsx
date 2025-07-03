'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { SearchFilters } from '@/components/search-filters';

export function SearchClientPage() {
  const searchParams = useSearchParams();
  const allProducts = useMemo(() => getProducts(), []);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  const [filters, setFilters] = useState({
    categories: searchParams.getAll('category'),
    priceRange: [0, 160000] as [number, number],
    availability: false,
  });

  useEffect(() => {
    const query = searchParams.get('q')?.toLowerCase() || '';
    const categoryParams = searchParams.getAll('category');

    let products = allProducts;

    if (query) {
      products = products.filter(p => p.name.toLowerCase().includes(query));
    }
    
    // Combine initial category params from URL with filter state
    const activeCategories = [...new Set([...filters.categories, ...categoryParams])];
    if (activeCategories.length > 0) {
        products = products.filter(p => activeCategories.includes(p.categoryId));
    }

    products = products.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    if (filters.availability) {
      products = products.filter(p => p.available);
    }
    
    setFilteredProducts(products);
  }, [searchParams, allProducts, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const initialQuery = searchParams.get('q');
  const initialCategories = searchParams.getAll('category');


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <SearchFilters 
            onFilterChange={handleFilterChange} 
            initialPriceRange={filters.priceRange}
            initialCategories={initialCategories}
          />
        </aside>
        <main className="md:col-span-3">
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            {initialQuery ? `Search results for "${initialQuery}"` : 'Explore Products'}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {filteredProducts.length} product{filteredProducts.length !== 1 && 's'} found.
          </p>
          {filteredProducts.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center justify-center text-center">
              <h2 className="font-headline text-2xl font-semibold">No Products Found</h2>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search query or filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
