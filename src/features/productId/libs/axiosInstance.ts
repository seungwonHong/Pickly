import axios from "axios";
import { getCookie } from "cookies-next";
import { triggerShowSigninModal } from "@/lib/utils/triggerShowSigninModal";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터:
axiosInstance.interceptors.request.use(
  (config) => {
    if (
      // post, patch, delete 요청에만 CSRF 토큰 추가
      config.method &&
      ["post", "patch", "delete"].includes(config.method.toLowerCase())
    ) {
      const csrfToken = getCookie("csrf-token");
      if (csrfToken) {
        config.headers["x-csrf-token"] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터:
axiosInstance.interceptors.response.use(
  (response) => {
    const responseData = response.data;
    if (responseData && responseData.success === false) {
      triggerShowSigninModal(); // 로그인 모달 표시
      return Promise.reject(responseData);
    }

    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401 || (data && data.success === false)) {
        triggerShowSigninModal(); // 로그인 모달 표시
      }
    }

    return Promise.reject(error);
  }
);
