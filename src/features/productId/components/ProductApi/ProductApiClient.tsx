import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getMusicvideo } from "@/features/productId/hooks/useGetMusicvideo";
import ProductYouTubeWrapper from "./ProductYouTubeWrapper";

export default async function ProductApiClient({
  searchQuery,
  category,
}: {
  searchQuery: string;
  category: number;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["youtube-video", searchQuery],
    queryFn: () => getMusicvideo(searchQuery),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductYouTubeWrapper query={searchQuery} category={category} />
    </HydrationBoundary>
  );
}
