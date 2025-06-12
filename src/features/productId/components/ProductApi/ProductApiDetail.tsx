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

  const combinedText = `${product.name}\n${product.description}`;

  const albumInfo = await fetchArtistAlbum(combinedText);

  if (!albumInfo) {
    console.error("fetchArtistAlbum 실패");
    return <div>아티스트 정보를 찾을 수 없습니다.</div>;
  }

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

    const match = jsonStr.match(/\{[\s\S]*\}/);
    if (match) {
      jsonStr = match[0];
    } else {
      throw new Error("JSON 부분을 찾을 수 없음");
    }

    const albumInfoObj = JSON.parse(jsonStr);

    artistName = albumInfoObj.artist ?? "";
    albumName = albumInfoObj.album ?? "";
  } catch (error) {
    console.error("albumInfo JSON 파싱 실패:", error, "응답값:", albumInfo);
    return <div>아티스트 정보를 파싱할 수 없습니다.</div>;
  }

  const searchQuery =
    artistName.length > 0
      ? `${artistName} ${
          albumName ? albumName : ""
        } official music video`.trim()
      : combinedText;

  return (
    <div className="flex items-center justify-between">
      <ProductApiClient searchQuery={searchQuery} />
      <ProductSpotifyClient
        artistName={artistName}
        albumName={albumName}
        product={product}
      />
    </div>
  );
}
