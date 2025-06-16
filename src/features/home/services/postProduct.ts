import axios from "axios";

const Base_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  categoryId: number | null;
  image: string | null;
  description: string | null;
  name: string | null;
  accessToken: string;
}

export default async function postProduct({
  categoryId,
  image,
  description,
  name,
  accessToken,
}: Props) {
  console.log("상품 등록 요청 payload", {
    categoryId,
    image,
    description,
    name,
  });
  
  try {
    const res = await axios.post(
      `${Base_URL}/products`,
      {
        categoryId,
        image,
        description,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("상품 등록 실패", error);
    if (axios.isAxiosError(error)) {
      console.error("상품 등록 실패 - 응답 내용:", error.response?.data);
    }
  }
}
