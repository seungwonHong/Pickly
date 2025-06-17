<<<<<<< HEAD
// import { cookies } from "next/headers";
import apiServerInstance from "@/lib/axios/index";

export async function getMyProfile() {
  //   const cookieStore = cookies();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk3LCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4NjczMzEwLCJpc3MiOiJzcC1tb2dhem9hIn0.Almry9H8io3c3gR61WPBuy_sXosdjsL3QgZBvLUy0Bw";
  //   (await cookieStore).get("accessToken")?.value;

  //   if (!token) {
  //     throw new Error("Access token is missing");
  //   }

  const res = await apiServerInstance.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
=======
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
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
}
