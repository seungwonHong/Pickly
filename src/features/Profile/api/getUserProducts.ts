import apiInstance from "@/lib/axios/index";
import { cookies } from "next/headers";
import { ProductTabType } from "../types/user";

/**
 * 유저활동 탭별 상품 조회 API
 * @param userId - 유저 ID
 * @param type - "reviewed" | "scrapped"
 * @param cursor - 페이징 커서 (기본값 0)
 */
export async function getUserProducts(
  userId: number,
  type: ProductTabType,
  cursor = 0
) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;

  const headers = token ? { Authorization: `Bearer ${token}` } : {}; // 토큰이 없어도 API 호출 가능하도록 처리

  const res = await apiInstance.get(`/users/${userId}/${type}-products`, {
    params: { cursor },
    headers,
  });

  return res.data.list;
}
