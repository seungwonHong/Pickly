import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json(
      { error: "Query parameter q is required" },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "YouTube API key is missing" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
        q
      )}&key=${apiKey}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "YouTube API request failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const err = error as Error;
    console.error("YouTube API fetch error:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch data from YouTube API",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
