import ProductYouTubeSection from "./ProductYouTubeSection";

export default function ProductYouTubeWrapper({
  query,
  category,
}: {
  query: string;
  category: number;
}) {
  return <ProductYouTubeSection query={query} category={category} />;
}
