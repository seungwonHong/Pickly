"use server";

import { cookies } from "next/headers";
import { apiInstance } from "@/lib/axios";

export async function uploadProfileImage(file: File): Promise<string> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;

  if (!token) {
    throw new Error("로그인 토큰이 없습니다.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await apiInstance.post(`/images/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.url;
}
