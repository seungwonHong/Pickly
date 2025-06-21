"use client";
import React from "react";
import { YoutubeVideo } from "../../youtube-video";
import LoadingSkeletonYoutube from "./LoadingSkeletonYoutube";
interface InnerYouTubeSectionProps {
  category: number;
  initialVideos?: YoutubeVideo[];
}

export default function ProductYouTubeSection({
  category,
  initialVideos = [],
}: InnerYouTubeSectionProps) {
  const videos = initialVideos;

  if (!videos || videos.length === 0) {
    return (
      <div>
        <LoadingSkeletonYoutube />
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
