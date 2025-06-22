import { Suspense } from "react";
import OAuthSignUpPage from "@/features/signup/components/OAuthSignUpPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OAuthSignUpPage />
    </Suspense>
  );
}
