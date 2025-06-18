"use client";

import { useYouTubeQuery } from "@/features/productId/hooks/useGetMusicvideo";

export default function ProductYouTubeSection({
  query,
  category,
}: {
  query: string;
  category: number;
}) {
  const { data: videos } = useYouTubeQuery(query);

  if (!videos || videos.length === 0) {
    return (
      <div className="animate-pulse">
        <div className="lg:min-w-[620px] md:min-w-[460px] lg:h-[350px] md:h-[260px] min-w-[330px] h-[190px] bg-gray-300 rounded-xl" />
      </div>
    );
  }

  if (category === 1) {
    return (
      <div className="w-full">
        {videos.map((video) => (
          <iframe
            key={video.id.videoId}
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            className="rounded-xl lg:w-[620px] md:w-[460px] lg:h-[350px] md:h-[260px] w-[330px] h-[190px]"
            allowFullScreen
            loading="lazy"
          />
        ))}
      </div>
    );
  }

  if (category === 2) {
    return (
      <div className="w-full">
        {videos.map((video) => (
          <iframe
            key={video.id.videoId}
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            className="rounded-xl lg:h-[450px] md:h-[350px] h-[190px] w-full"
            allowFullScreen
            loading="lazy"
          />
        ))}
      </div>
    );
  }

  return null;
}
