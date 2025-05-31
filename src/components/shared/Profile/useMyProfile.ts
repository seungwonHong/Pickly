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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidGVhbUlkIjoiZGVmYXVsdCIsImlhdCI6MTc0ODQxMzYzMywiaXNzIjoic3AtbW9nYXpvYSJ9.5-tiiXDtNS1uXFAJsOIk3EndrWisvz9_iWxZ9kOIC74`,
        },
      });
      return res.data;
    },
  });
};
