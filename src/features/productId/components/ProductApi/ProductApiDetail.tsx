import dynamic from "next/dynamic";

import { productService } from "../../api";
import {
  fetchArtistAlbum,
  fetchGoogleSearch,
  fetchMovieSearch,
} from "../../hooks/fetchOpenAi";
import LazyLoadSection from "../ProductIdDetail/LazyLoadSection";

const ProductApiClient = dynamic(() => import("./ProductApiClient"));
const ProductSpotifyClient = dynamic(() => import("./ProductSpotifyClient"));
const MapView = dynamic(() => import("./MapView"));
export default async function ProductApiDetail({
  productId,
}: {
  productId: number;
}) {
  const response = await productService.getProductsId(productId);
  const product = response.data;
  if (!product) return <div>상품 정보가 없습니다.</div>;

  const combinedText = `${product.name}\n${product.description}`;

  const [albumInfo, placeInfo, movieInfo] = await Promise.all([
    fetchArtistAlbum(combinedText),
    fetchGoogleSearch(combinedText),
    fetchMovieSearch(combinedText),
  ]);

  let artistName = "";
  let albumName = "";

  try {
    let jsonStr = albumInfo.trim();

    if (jsonStr.startsWith("```")) {
      const lines = jsonStr.split("\n");
      if (lines.length >= 3) {
        jsonStr = lines.slice(1, -1).join("\n").trim();
      }
    }

    // JSON 문자열 파싱
    const albumInfoObj = JSON.parse(jsonStr);

    artistName = albumInfoObj.artist?.replace(/\(.*?\)/g, "").trim() ?? "";
    albumName = albumInfoObj.album?.trim() ?? "";
  } catch (error) {
    console.error("albumInfo JSON 파싱 실패:", error, "응답값:", albumInfo);
    return <div>아티스트 정보를 파싱할 수 없습니다.</div>;
  }

  const searchQuery =
    artistName.length > 0
      ? `${artistName} ${albumName} official music video`.trim()
      : combinedText;

  // Google 검색을 통해 장소 정보 추출
  let parsedPlace = "";
  try {
    if (placeInfo) {
      const parsed = JSON.parse(placeInfo.trim());
      parsedPlace = parsed?.place ?? "";
    } else {
      console.error("fetchGoogleSearch 결과가 null입니다");
    }
  } catch (e) {
    console.error("장소 정보 파싱 실패", e);
  }

  // 영화 드라마 공식 트레일러
  let parsedMovie = "";
  try {
    if (movieInfo) {
      const parsed = JSON.parse(movieInfo.trim());
      parsedMovie = parsed?.trailer ?? "";
    } else {
      console.error("fetchMovieSearch 결과가 null입니다");
    }
  } catch (e) {
    console.error("영화 정보 파싱 실패", e);
  }
  return (
    <>
      <LazyLoadSection>
        {product.category?.id === 1 && (
          <div className="flex gap-[20px] flex-col ">
            <div className="flex items-center lg:gap-[20px] gap-[15px] flex-col md:flex-row">
              <ProductApiClient
                searchQuery={searchQuery}
                category={product.category.id}
              />
              <ProductSpotifyClient
                artistName={artistName}
                albumName={albumName}
                product={product}
              />
            </div>
          </div>
        )}
        {(product.category?.id === 4 || product.category?.id === 6) && (
          <div style={{ height: "400px" }}>
            <MapView place={parsedPlace} />
          </div>
        )}
        {product.category?.id === 2 && (
          <ProductApiClient
            searchQuery={parsedMovie}
            category={product.category.id}
          />
        )}
      </LazyLoadSection>
    </>
  );
}
