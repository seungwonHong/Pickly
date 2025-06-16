"use server";

import { apiInstance } from "@/lib/axios";
import { User } from "../types/user";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk3LCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4NjczMzEwLCJpc3MiOiJzcC1tb2dhem9hIn0.Almry9H8io3c3gR61WPBuy_sXosdjsL3QgZBvLUy0Bw";

/**
 * 사용자 프로필 수정 API
 * @param data nickname, description, image (S3 URL)
 */
export async function updateMyProfile(
  data: Pick<User, "nickname" | "description" | "image">
) {
  // 🚫 서버 요구사항: image는 유효한 URL이어야 하므로, 비어 있거나 none이면 null 처리
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
