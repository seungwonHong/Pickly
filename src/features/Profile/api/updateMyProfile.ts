"use server";

// import { cookies } from "next/headers";
import { apiInstance } from "@/lib/axios";
import { User } from "../types/user";

export async function updateMyProfile(
  data: Pick<User, "nickname" | "description" | "image">
) {
  //   const cookieStore = cookies();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk3LCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4NjczMzEwLCJpc3MiOiJzcC1tb2dhem9hIn0.Almry9H8io3c3gR61WPBuy_sXosdjsL3QgZBvLUy0Bw";

  //   (await cookieStore).get("accessToken")?.value;

  //   if (!token) {
  //     throw new Error("No access token");
  //   }

  await apiInstance.patch("/users/me", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
