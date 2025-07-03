import { ProductsClientPage } from "@/components/products-client-page";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16">Loading...</div>}>
      <ProductsClientPage />
    </Suspense>
  );
}
