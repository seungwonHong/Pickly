import { getCookie } from "cookies-next";

export const checkLoginStatus = async (): Promise<{
  isLoggedIn: boolean;
  accessToken?: string;
}> => {
  const csrfToken = getCookie("csrf-token") ?? "";

  try {
    const res = await fetch("/api/cookie", {
      method: "GET",
      credentials: "include",
      headers: {
        "x-csrf-token": csrfToken as string,
      },
    });

    if (!res.ok) return { isLoggedIn: false };

    const data = await res.json();
    return {
      isLoggedIn: !!data.accessToken,
      accessToken: data.accessToken?.value,
    };
  } catch (err) {
    console.error("Login check failed:", err);
    return { isLoggedIn: false };
  }
};
