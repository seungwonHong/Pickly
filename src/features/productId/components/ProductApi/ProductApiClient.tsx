"use client";

import ProductYouTubeSection from "./ProductYouTubeSection";

export default function ProductApiClient({
  searchQuery,
}: {
  searchQuery: string;
}) {
  return (
    <div>
      <ProductYouTubeSection query={searchQuery} />
    </div>
  );
}
