"use server";

import { cookies } from "next/headers";
import { apiInstance } from "@/lib/axios";
import { User } from "../types/user";

export async function getMyProfile(): Promise<User | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access-token")?.value;

  if (!token) return null;

  try {
    const res = await apiInstance.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("인증 실패:", error);
    return null;
  }
}
