import { SearchClientPage } from "@/components/search-client-page";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchClientPage />
    </Suspense>
  );
}
