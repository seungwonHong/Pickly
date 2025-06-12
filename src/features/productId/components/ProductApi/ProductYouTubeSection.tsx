"use client";

import { useYouTubeQuery } from "@/features/productId/hooks/useGetMusicvideo";

export default function ProductYouTubeSection({ query }: { query: string }) {
  const { data: videos, isLoading, error } = useYouTubeQuery(query);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {(error as Error).message}</div>;
  if (!videos || videos.length === 0) return <div>결과 없음</div>;

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id.videoId}>
          <iframe
            width="516"
            height="288"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
}
