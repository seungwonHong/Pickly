<<<<<<< HEAD
import { apiInstance } from "@/lib/axios/index"; // 서버 전용 Axios 인스턴스
// import { cookies } from "next/headers";
import { ProductTabType } from "../types/user";

=======
import apiInstance from "@/lib/axios/index";
import { cookies } from "next/headers";
import { ProductTabType } from "../types/user";

/**
 * 유저활동 탭별 상품 조회 API
 * @param userId - 유저 ID
 * @param type - "reviewed" | "scrapped"
 * @param cursor - 페이징 커서 (기본값 0)
 */
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
export async function getUserProducts(
  userId: number,
  type: ProductTabType,
  cursor = 0
) {
<<<<<<< HEAD
  //   const cookieStore = cookies();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk3LCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4NjczMzEwLCJpc3MiOiJzcC1tb2dhem9hIn0.Almry9H8io3c3gR61WPBuy_sXosdjsL3QgZBvLUy0Bw";

  //   (await cookieStore).get("accessToken")?.value;

  //   if (!token) {
  //     throw new Error("인증 토큰이 없습니다.");
  //   }

  const res = await apiInstance.get(`/users/${userId}/${type}-products`, {
    params: { cursor },
    headers: {
      Authorization: `Bearer ${token}`,
    },
=======
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;

  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // 토큰이 없어도 API 호출 가능하도록 처리

  const res = await apiInstance.get(`/users/${userId}/${type}-products`, {
    params: { cursor },
    headers,
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
  });

  return res.data.list;
}
