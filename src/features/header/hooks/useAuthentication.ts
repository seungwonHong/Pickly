import { useEffect, useState } from "react";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchCookieStatus = async () => {
      try {
        const csrfToken =
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrf-token="))
            ?.split("=")[1] ?? "";

        const res = await fetch("/api/cookie", {
          method: "GET",
          credentials: "include", // 쿠키 포함 옵션
          headers: {
            "x-csrf-token": csrfToken,
          },
        });

        const data = await res.json();

        if (data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("헤더 로그인 검증 실패", error);
      }
    };

    fetchCookieStatus();
  }, []);

  return {
    isAuthenticated,
  };
};

export default useAuthentication;
