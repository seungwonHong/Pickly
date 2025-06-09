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
}
