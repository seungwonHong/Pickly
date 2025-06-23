"use client";
import React from "react";
import { YoutubeVideo } from "../../youtube-video";
import LoadingSkeletonYoutube from "./LoadingSkeletonYoutube";

interface InnerYouTubeSectionProps {
  category: number;
  initialVideos?:
    | YoutubeVideo[]
    | Array<{
        videoId: string;
        title: string;
        thumbnail?: string;
        publishedAt?: string;
      }>;
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

  function getVideoId(video: any): string | undefined {
    if (video?.id?.videoId) return video.id.videoId;

    if (video?.videoId) return video.videoId;
    return undefined;
  }

  function getTitle(video: any): string | undefined {
    if (video?.snippet?.title) return video.snippet.title;

    if (video?.title) return video.title;
    return undefined;
  }

  if (category === 1) {
    return (
      <div className="w-full">
        {videos.map((video, i) => {
          const videoId = getVideoId(video);
          const title = getTitle(video);

          if (!videoId || !title) {
            return (
              <div key={i} className="text-red-500">
                Invalid video data
              </div>
            );
          }

          return (
            <iframe
              key={videoId}
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              className="rounded-xl lg:w-[620px] md:w-[460px] lg:h-[350px] md:h-[260px] w-[330px] h-[190px]"
              allowFullScreen
              loading="lazy"
            />
          );
        })}
      </div>
    );
  }

  if (category === 2) {
    return (
      <div className="w-full">
        {videos.map((video, i) => {
          const videoId = getVideoId(video);
          const title = getTitle(video);

          if (!videoId || !title) {
            return (
              <div key={i} className="text-red-500">
                Invalid video data
              </div>
            );
          }

          return (
            <iframe
              key={videoId}
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              className="rounded-xl lg:h-[450px] md:h-[350px] h-[190px] w-full"
              allowFullScreen
              loading="lazy"
            />
          );
        })}
      </div>
    );
  }

  return null;
}
