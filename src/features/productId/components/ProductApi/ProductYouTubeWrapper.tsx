"use client";

import dynamic from "next/dynamic";

const ProductYouTubeSection = dynamic(() => import("./ProductYouTubeSection"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="lg:w-[620px] md:w-[460px] lg:h-[350px] md:h-[260px] w-[330px] h-[190px] bg-gray-300 rounded-xl" />
    </div>
  ),
});

export default function ProductYouTubeWrapper({
  query,
  category,
}: {
  query: string;
  category: number;
}) {
  return <ProductYouTubeSection query={query} category={category} />;
}
