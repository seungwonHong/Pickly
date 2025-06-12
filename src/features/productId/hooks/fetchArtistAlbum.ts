// ai에게 post 요청을 보내 아티스트와 앨범 이름을 추출하는 함수

export default async function fetchArtistAlbum(text: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL ||
        "https://mogazoa-api.vercel.app/14-6";

  const res = await fetch(`${baseUrl}/api/openai`, {
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

  const data = await res.json();
  return data.result;
}
