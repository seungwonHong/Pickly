import dynamic from "next/dynamic";
import { Suspense } from "react";

const GoogleCallback = dynamic(
  () => import("../../../features/google/components/GoogleCallback"),
  { ssr: false }
);

export default function GooglePage() {
  return (
    <Suspense fallback={<p>구글 로그인 중입니다...⏳</p>}>
      <GoogleCallback />
    </Suspense>
  );
}
