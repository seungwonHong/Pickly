import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import getMusicvideo from "@/features/productId/hooks/useGetMusicvideo";
import ProductYouTubeSection from "./ProductYouTubeSection";

export default async function ProductApiClient({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["youtube-video", searchQuery],
    queryFn: () => getMusicvideo(searchQuery),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductYouTubeSection query={searchQuery} />
    </HydrationBoundary>
  );
}
