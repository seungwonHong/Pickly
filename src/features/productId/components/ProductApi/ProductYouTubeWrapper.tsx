import ProductYouTubeSection from "./ProductYouTubeSection";
import { YoutubeVideo } from "../../youtube-video";

export default function ProductYouTubeWrapper({
  category,
  initialVideos,
}: {
  category: number;
  initialVideos?: YoutubeVideo[];
}) {
  return (
    <ProductYouTubeSection category={category} initialVideos={initialVideos} />
  );
}
