"use client";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/lib/axios/index";
import { User } from "@/types/user";

export const useMyProfile = () => {
  return useQuery<User>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      //   const token = localStorage.getItem('accessToken')
      const res = await apiInstance.get("/users/me", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzk3LCJ0ZWFtSWQiOiIxNC02IiwiaWF0IjoxNzQ4NjczMzEwLCJpc3MiOiJzcC1tb2dhem9hIn0.Almry9H8io3c3gR61WPBuy_sXosdjsL3QgZBvLUy0Bw`,
        },
      });
      return res.data;
    },
  });
};
