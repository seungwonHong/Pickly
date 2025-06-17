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
<<<<<<< HEAD
=======
  console.log("상품 등록 요청 payload", {
    categoryId,
    image,
    description,
    name,
  });
  
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
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
<<<<<<< HEAD
=======
    if (axios.isAxiosError(error)) {
      console.error("상품 등록 실패 - 응답 내용:", error.response?.data);
    }
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  }
}
