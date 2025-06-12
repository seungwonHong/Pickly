// server-side function (서버에서 비동기 데이터 fetching만)
async function fetchProductVideos(productId: number) {
  const response = await productService.getProductsId(productId);
  const product = response.data;
  if (!product) return { product: null, videos: [] };

  const combinedText = `${product.name}\n${product.description}`;

  // 여기서는 React 훅 대신 getMusicvideo()처럼 일반 함수 사용
  const videos = await getMusicvideo(combinedText);

  return { product, videos };
}

// 클라이언트 컴포넌트
("use client");

import React from "react";
import { useYouTubeQuery } from "../../hooks/useGetMusicvideo";

function MusicVideoPlayer({ searchQuery }: { searchQuery: string }) {
  const { data: videos, isLoading, error } = useYouTubeQuery(searchQuery);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error 발생</div>;

  return (
    <>
      {videos?.map((video) => (
        <iframe
          key={video.id.videoId}
          width="516"
          height="288"
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
          title={video.snippet.title}
          frameBorder="0"
          allowFullScreen
        />
      ))}
    </>
  );
}

// 페이지 컴포넌트 예시
export default async function ProductApiPage({
  productId,
}: {
  productId: number;
}) {
  const { product, videos } = await fetchProductVideos(productId);
  if (!product) return <div>상품 정보가 없습니다.</div>;

  // artistName, albumName 추출 로직 (예: videos[0].snippet.title)
  const artistMatch = videos[0]?.snippet.title.match(/아티스트명:\s*(.+)/);
  const albumMatch = videos[0]?.snippet.title.match(/앨범명:\s*(.+)/);

  const artistName = artistMatch ? artistMatch[1].trim() : "";
  const albumName = albumMatch ? albumMatch[1].trim() : "";

  const searchQuery = artistName
    ? `${artistName} ${albumName ? albumName : ""} official music video`.trim()
    : "official music video";

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>

      {/* 클라이언트 컴포넌트에서 React Query 사용 */}
      <MusicVideoPlayer searchQuery={searchQuery} />
    </div>
  );
}
