"use client";

import { useYouTubeQuery } from "@/features/productId/hooks/useGetMusicvideo";

export default function ProductYouTubeSection({ query }: { query: string }) {
  const { data: videos, error } = useYouTubeQuery(query);

  if (error) return <div>오류 발생: {(error as Error).message}</div>;

  if (!videos || videos.length === 0)
    return (
      <div className="animate-pulse">
        <div className="w-[620px] h-[350px] bg-gray-300 rounded-xl mb-4" />
        <div className="w-1/2 h-6 bg-gray-200 rounded mt-2" />
      </div>
    );
  return (
    <div>
      {videos.map((video) => (
        <div key={video.id.videoId}>
          <iframe
            width="620"
            height="350"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            className="rounded-xl"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
}
