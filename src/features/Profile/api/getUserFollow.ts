"use server";

import { cookies } from "next/headers";
import { apiInstance } from "@/lib/axios";

export async function followUser(userId: number) {
  const token = (await cookies()).get("access-token")?.value;
  if (!token) throw new Error("로그인 토큰이 없습니다.");

  const res = await apiInstance.post(
    `/follow`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function unfollowUser(userId: number) {
  const token = (await cookies()).get("access-token")?.value;
  if (!token) throw new Error("로그인 토큰이 없습니다.");

  const res = await apiInstance.delete(`/follow`, {
    data: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
