"use server";

import { cookies } from "next/headers";
import { apiInstance } from "@/lib/axios";
import { User } from "../types/user";

/**
 * 사용자 프로필 수정 API
 * @param data nickname, description, image (S3 URL)
 */
export async function updateMyProfile(
  data: Pick<User, "nickname" | "description" | "image">
) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;

  if (!token) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  // 이미지 유효성 체크 (빈 값 or https가 아니면 null 처리)
  const safeImage =
    data.image && /^https?:\/\//.test(data.image) ? data.image : null;

  await apiInstance.patch(
    "/users/me",
    {
      nickname: data.nickname,
      description: data.description,
      image: safeImage,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
