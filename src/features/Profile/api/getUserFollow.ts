import apiInstance from "@/lib/axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk3LCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4NjczMzEwLCJpc3MiOiJzcC1tb2dhem9hIn0.Almry9H8io3c3gR61WPBuy_sXosdjsL3QgZBvLUy0Bw";

export async function followUser(userId: number) {
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
  const res = await apiInstance.delete(`/follow`, {
    data: { userId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
