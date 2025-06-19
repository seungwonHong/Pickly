// ai에게 post 요청을 보내 아티스트와 앨범 이름을 추출하는 함수
export async function fetchArtistAlbum(text: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.BASE_URL || "https://mogazoa-api.vercel.app/14-6";

  const res = await fetch(`${baseUrl}/api/openai/extract-music`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    console.error("API 응답 실패", await res.text());
    return null;
  }
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data.result;
}

// ai에게 post 요청을 보내 장소 이름을 추출하는 함수
export async function fetchGoogleSearch(query: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.BASE_URL || "https://mogazoa-api.vercel.app/14-6";

  const res = await fetch(`${baseUrl}/api/openai/extract-place`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: query }),
  });

  if (!res.ok) {
    console.error("Google Search API 응답 실패", await res.text());
    return null;
  }
  const data = await res.json();
  console.log("Google Search API 응답:", data);
  return data.result;
}

// 영화 드라마 공식 트레일러
export async function fetchMovieSearch(query: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.BASE_URL ||
        "https://mogazoa-api.vercel.app/14-6";

  const res = await fetch(`${baseUrl}/api/openai/extract-movie`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: query }),
  });

  if (!res.ok) {
    console.error("Google Search API 응답 실패", await res.text());
    return null;
  }
  const data = await res.json();
 
  return data.result;
}
