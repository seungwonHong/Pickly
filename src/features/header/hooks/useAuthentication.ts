import { useEffect, useState } from "react";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchCookieStatus = async () => {
      try {
        const res = await fetch("/api/cookie", {
          method: "GET",
          credentials: "include", // 쿠키 포함 옵션
        });

        const data = await res.json();

        if (data.success) {
          console.log("로그인 된 상태");
          setIsAuthenticated(true);
        } else {
          console.log("로그인 돼있지 않음");
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
