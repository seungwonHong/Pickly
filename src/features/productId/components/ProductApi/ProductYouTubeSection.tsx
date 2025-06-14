"use client";

import { useYouTubeQuery } from "@/features/productId/hooks/useGetMusicvideo";

export default function ProductYouTubeSection({ query }: { query: string }) {
  const { data: videos } = useYouTubeQuery(query);

  if (!videos || videos.length === 0)
    return (
      <div className="animate-pulse">
        <div className="lg:w-[620px] md:w-[460px] lg:h-[350px] md:h-[260px] w-[330px] h-[190px]  bg-gray-300 rounded-xl " />
      </div>
    );
  return (
    <div>
      {videos.map((video) => (
        <div key={video.id.videoId}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            className="rounded-xl lg:w-[620px] md:w-[460px] lg:h-[350px] md:h-[260px] w-[330px] h-[190px] "
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
}
