"use server";
import { apiInstance } from "@/lib/axios";
import { cookies } from "next/headers";
import { User } from "../types/user";

export async function getUserProfile(userId: number): Promise<User> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;

  const res = await apiInstance.get(`/users/${userId}`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}, // 비로그인일 경우 빈 헤더로 호출
  });

  return res.data;
}
