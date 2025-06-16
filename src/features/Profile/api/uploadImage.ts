import { apiInstance } from "@/lib/axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk3LCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4NjczMzEwLCJpc3MiOiJzcC1tb2dhem9hIn0.Almry9H8io3c3gR61WPBuy_sXosdjsL3QgZBvLUy0Bw";

export async function uploadProfileImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file); // ⬅️ key는 반드시 "image"

  const res = await apiInstance.post(`/images/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.url; // ⬅️ 스웨거에 따르면 이게 응답 key
}
