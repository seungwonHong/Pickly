import { productService } from "../../api";
import fetchArtistAlbum from "../../hooks/fetchArtistAlbum";
import ProductApiClient from "./ProductApiClient";
import ProductSpotifyClient from "./ProductSpotifyClient";

export default async function ProductApiDetail({
  productId,
}: {
  productId: number;
}) {
  const response = await productService.getProductsId(productId);
  const product = response.data;
  if (!product) return <div>상품 정보가 없습니다.</div>;
  console.log("product", product);

  const combinedText = `${product.name}\n${product.description}`;

  // 아티스트 이름과 설명을 추출하여 ai에게 전달
  const albumInfo = await fetchArtistAlbum(combinedText);

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

  return (
    <div className="flex gap-[20px] flex-col ">
      <div className="text-white lg:text-[20px] md:text-[16px] font-normal">
        음악 들으러 가기
      </div>
      <div className="flex items-center gap-[20px]">
        <ProductApiClient searchQuery={searchQuery} />
        <ProductSpotifyClient
          artistName={artistName}
          albumName={albumName}
          product={product}
        />
      </div>
    </div>
  );
}
