import { getMusicvideo } from "@/features/productId/hooks/useGetMusicvideo";
import ProductYouTubeSection from "./ProductYouTubeSection";
import { YoutubeVideo } from "@/features/productId/youtube-video";
export default async function ProductApiClient({
  searchQuery,
  category,
  initialVideos,
}: {
  searchQuery: string;
  category: number;
  initialVideos?: YoutubeVideo[];
}) {
  const videos = initialVideos ?? (await getMusicvideo(searchQuery));

  return <ProductYouTubeSection category={category} initialVideos={videos} />;
}
