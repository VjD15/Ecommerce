'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { getProducts, getCategories } from '@/lib/data';
import type { Product, Category } from '@/lib/types';
import Link from 'next/link';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<(Product | Category)[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const allProducts = getProducts();
  const allCategories = getCategories();

  useEffect(() => {
    if (query.length > 1) {
      const lowerCaseQuery = query.toLowerCase();
      const productSuggestions = allProducts
        .filter((p) => p.name.toLowerCase().includes(lowerCaseQuery))
        .slice(0, 3);
      const categorySuggestions = allCategories
        .filter((c) => c.name.toLowerCase().includes(lowerCaseQuery))
        .slice(0, 2);
      setSuggestions([...productSuggestions, ...categorySuggestions]);
    } else {
      setSuggestions([]);
    }
  }, [query]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
      setIsFocused(false);
    }
  };
  
  const handleSuggestionClick = () => {
    setQuery('');
    setIsFocused(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search products..."
          className="h-9 w-full rounded-md bg-background pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
      </form>
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full z-10 mt-2 w-full rounded-md border bg-popover p-2 text-popover-foreground shadow-lg">
          <ul>
            {suggestions.map((item) => (
              <li key={item.id}>
                {'price' in item ? ( // Type guard for Product
                  <Link href={`/products/${item.id}`} onClick={handleSuggestionClick} className="block rounded-sm px-3 py-2 text-sm hover:bg-accent">
                      {item.name} <span className="text-xs text-muted-foreground">- Product</span>
                  </Link>
                ) : ( // Category
                  <Link href={`/search?category=${item.id}`} onClick={handleSuggestionClick} className="block rounded-sm px-3 py-2 text-sm hover:bg-accent">
                    {item.name} <span className="text-xs text-muted-foreground">- Category</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
