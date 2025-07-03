
'use client';

import { useState, useEffect } from 'react';
import { getCookie, setCookie } from '@/lib/cookies';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';

interface DynamicPriceProps {
  basePrice: number;
  productId: string;
}

const VISIT_COUNT_COOKIE_PREFIX = 'product_visits_';
const MAX_DISCOUNT_PERCENTAGE = 0.2; // 20%
const PRICE_ADJUSTMENT_PER_VISIT = 0.01; // 1%

export function DynamicPrice({ basePrice, productId }: DynamicPriceProps) {
  const [visitCount, setVisitCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const cookieName = `${VISIT_COUNT_COOKIE_PREFIX}${productId}`;
    const currentVisits = parseInt(getCookie(cookieName) || '0', 10);
    const newVisitCount = currentVisits + 1;
    setCookie(cookieName, newVisitCount.toString(), 30);
    setVisitCount(newVisitCount);
  }, [productId]);

  if (!isClient) {
    // Render a placeholder on the server
    return <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />;
  }
  
  const discountPercentage = Math.min(
    (visitCount - 1) * PRICE_ADJUSTMENT_PER_VISIT,
    MAX_DISCOUNT_PERCENTAGE
  );
  const finalPrice = basePrice * (1 - discountPercentage);

  return (
    <div className="flex items-baseline gap-2">
      <span className={cn("font-bold", discountPercentage > 0 ? "text-primary" : "text-foreground", "text-2xl")}>
        {formatCurrency(finalPrice)}
      </span>
      {discountPercentage > 0 && (
        <span className="text-sm text-muted-foreground line-through">
          {formatCurrency(basePrice)}
        </span>
      )}
    </div>
  );
}
