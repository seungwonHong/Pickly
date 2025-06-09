import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 프론트에서 호출할 주소
        destination: "https://mogazoa-api.vercel.app/14-6/:path*", // 실제 백엔드 주소
      },
    ];
  },
};

export default nextConfig;
