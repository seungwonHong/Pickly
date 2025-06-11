import { YoutubeVideo } from "../youtube-video";

export default async function useGetMusicvideo(
  trackName: string
): Promise<YoutubeVideo[]> {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL ||
        "https://mogazoa-api.vercel.app/14-6";
  const apiPath = "/api/youtube-search";
  const url = `${baseUrl}${apiPath}?q=${encodeURIComponent(
    `${trackName} official music video`
  )}&type=video&order=viewCount&maxResults=10`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch YouTube videos from ${url}, status: ${res.status}`
    );
  }

  const data = await res.json();
  return data.items || [];
}
