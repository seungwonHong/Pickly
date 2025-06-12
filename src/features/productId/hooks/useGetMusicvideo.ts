import { YoutubeVideo } from "../youtube-video";

export default async function useGetMusicvideo(
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
    const res = await fetch(url, {
      // cache: "no-store", -> 임시 제거 ㅠㅠ
    });

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
