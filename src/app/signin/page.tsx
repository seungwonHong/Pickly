import { Suspense } from "react";
import SigninPage from "@/features/signin/components/SigninPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SigninPage />
    </Suspense>
  );
}
