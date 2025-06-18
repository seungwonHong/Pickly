import { Suspense } from "react";
import SignUpPage from "@/features/signup/components/SignUpPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SignUpPage />
    </Suspense>
  );
}
