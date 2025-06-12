import { YoutubeVideo } from "../youtube-video";
import { useQuery } from "@tanstack/react-query";

export default async function getMusicvideo(
  searchQuery: string
): Promise<YoutubeVideo[]> {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL ||
        "https://mogazoa-api.vercel.app/14-6";
  const apiPath = "/api/youtube-search";
  const url = `${baseUrl}${apiPath}?q=${encodeURIComponent(
    searchQuery
  )}&maxResults=1&type=video&order=viewCount`;

  try {
    const res = await fetch(url, {});

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error response from API: ${errorText}`);
      throw new Error(
        `Failed to fetch YouTube videos from ${url}, status: ${res.status}, message: ${errorText}`
      );
    }

    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("useGetMusicvideo error:", error);
    throw error;
  }
}

export function useYouTubeQuery(searchQuery: string) {
  return useQuery(
    ["youtube-video", searchQuery],
    () => getMusicvideo(searchQuery),
    {
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
      cacheTime: 1000 * 60 * 60, // 캐시는 1시간 유지
      enabled: !!searchQuery, // searchQuery가 있을 때만 실행
    }
  );
}
