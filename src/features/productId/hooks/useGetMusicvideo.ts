import { YoutubeVideo } from "../youtube-video";

export async function getMusicvideo(
  searchQuery: string
): Promise<YoutubeVideo[]> {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.BASE_URL || "https://mogazoa-api.vercel.app/14-6";

  const apiPath = "/api/youtube-search";
  const url = `${baseUrl}${apiPath}?q=${encodeURIComponent(
    searchQuery
  )}&maxResults=1&type=video&order=viewCount`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API 오류 응답: ${errorText}`);
      throw new Error(`YouTube fetch 실패 (${res.status}): ${errorText}`);
    }

    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("getMusicvideo error:", error);
    throw error;
  }
}
