import dynamic from "next/dynamic";

import {
  fetchArtistAlbum,
  fetchGoogleSearch,
  fetchMovieSearch,
} from "../../hooks/fetchOpenAi";
import LazyLoadSection from "../ProductIdDetail/LazyLoadSection";
import { GetProductIdDetail } from "@/features/productId/types";
import { getMusicvideo } from "../../hooks/useGetMusicvideo";

import ProductApiClient from "./ProductApiClient";
const ProductSpotifyClient = dynamic(() => import("./ProductSpotifyClient"));
const MapView = dynamic(() => import("./MapView"));

function parseJsonSafe(jsonStr: string) {
  try {
    let str = jsonStr.trim();

    if (str.startsWith("```")) {
      const lines = str.split("\n");
      if (lines.length >= 3) {
        str = lines.slice(1, -1).join("\n").trim();
      }
    }
    return JSON.parse(str);
  } catch (error) {
    console.error("JSON 파싱 실패", error, "원본:", jsonStr);
    return null;
  }
}
export default async function ProductApiDetail({
  product,
}: {
  product: GetProductIdDetail;
}) {
  if (!product) return <div>상품 정보가 없습니다.</div>;

  const combinedText = `${product.name}\n${product.description}`;

  // OpenAI API 호출 병렬처리
  const [albumInfoRaw, placeInfoRaw, movieInfoRaw] = await Promise.all([
    fetchArtistAlbum(combinedText),
    fetchGoogleSearch(combinedText),
    fetchMovieSearch(combinedText),
  ]);

  // albumInfo 파싱
  const albumInfoObj = parseJsonSafe(albumInfoRaw);
  const artistName = albumInfoObj?.artist?.replace(/\(.*?\)/g, "").trim() ?? "";
  const albumName = albumInfoObj?.album?.trim() ?? "";

  // 검색 쿼리 설정
  const searchQuery =
    artistName.length > 0
      ? `${artistName} ${albumName} official music video`.trim()
      : combinedText;

  // 장소 정보 파싱
  const placeInfoObj = parseJsonSafe(placeInfoRaw);
  const parsedPlace = placeInfoObj?.place ?? "";

  // 영화 정보 파싱
  const movieInfoObj = parseJsonSafe(movieInfoRaw);
  const parsedMovie = movieInfoObj?.trailer ?? "";
  const categoryId = product.category?.id ?? 0;

  const videos = await getMusicvideo(searchQuery);
  const videoTrailer = await getMusicvideo(parsedMovie);
  return (
    <>
      <LazyLoadSection>
        {categoryId === 1 && (
          <div className="flex gap-[20px] flex-col ">
            <div className="flex items-center lg:gap-[20px] gap-[15px] flex-col md:flex-row">
              <ProductApiClient
                searchQuery={searchQuery}
                category={product.category.id}
                initialVideos={videos}
              />
              <ProductSpotifyClient
                artistName={artistName}
                albumName={albumName}
                product={product}
              />
            </div>
          </div>
        )}
        {(categoryId === 4 || categoryId === 6) && (
          <div>
            <MapView place={parsedPlace} />
          </div>
        )}
        {categoryId === 2 && (
          <ProductApiClient
            searchQuery={parsedMovie}
            category={product.category.id}
            initialVideos={videoTrailer}
          />
        )}
      </LazyLoadSection>
    </>
  );
}
