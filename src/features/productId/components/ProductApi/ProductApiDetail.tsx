import dynamic from "next/dynamic";

import {
  fetchArtistAlbum,
  fetchGoogleSearch,
  fetchMovieSearch,
} from "../../hooks/fetchOpenAi";
import LazyLoadSection from "../ProductIdDetail/LazyLoadSection";
import { GetProductIdDetail } from "@/features/productId/types";
import { getMusicvideo } from "../../hooks/useGetMusicvideo";

import { YoutubeVideo } from "@/features/productId/youtube-video";
import ProductApiClient from "./ProductApiClient";
const ProductSpotifyClient = dynamic(() => import("./ProductSpotifyClient"));
const MapView = dynamic(() => import("./MapView"));

// JSON 파싱 함수
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
  const categoryId = product.category?.id ?? 0;

  let artistName = "";
  let albumName = "";
  let searchQuery = "";
  let videos: YoutubeVideo[] = [];
  let videoTrailer: YoutubeVideo[] = [];
  let parsedPlace = "";
  let parsedMovie = "";

  // 카테고리1 음악과 뮤직비디오
  if (categoryId === 1) {
    const albumInfoRaw = await fetchArtistAlbum(combinedText);
    const albumInfoObj = parseJsonSafe(albumInfoRaw);
    artistName = albumInfoObj?.artist?.replace(/\(.*?\)/g, "").trim() ?? "";
    albumName = albumInfoObj?.album?.trim() ?? "";

    searchQuery =
      artistName.length > 0
        ? `${artistName} ${albumName} official music video`.trim()
        : combinedText;

    try {
      videos = await getMusicvideo(searchQuery);
    } catch (e) {
      console.error("유튜브 fetch 실패 - videos:", e);
    }
  }

  // 카테고리 2 영화 or 드라마
  if (categoryId === 2) {
    const movieInfoRaw = await fetchMovieSearch(combinedText);
    const movieInfoObj = parseJsonSafe(movieInfoRaw);
    parsedMovie = movieInfoObj?.trailer ?? "";

    try {
      videoTrailer = await getMusicvideo(parsedMovie);
    } catch (e) {
      console.error("유튜브 fetch 실패 - videoTrailer:", e);
    }
  }

  // 카테고리 4 호텔 그리고 카테고리 6 음식점
  if (categoryId === 4 || categoryId === 6) {
    const placeInfoRaw = await fetchGoogleSearch(combinedText);
    const placeInfoObj = parseJsonSafe(placeInfoRaw);
    parsedPlace = placeInfoObj?.place ?? "";
  }
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
        {(categoryId === 4 || categoryId === 6) && parsedPlace && (
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
