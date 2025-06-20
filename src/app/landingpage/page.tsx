import AddProductModalIntro from "@/features/landing/components/AddProductModalIntro";
import AddReviewModalIntro from "@/features/landing/components/AddReviewModalIntro";
import CategoryGrid from "@/features/landing/components/CategoryGrid";
import CompareProducts from "@/features/landing/components/CompareProducts";
import Footer from "@/features/landing/components/Footer";
import HomePagePreview from "@/features/landing/components/HomePagePreview";
import LandingPageTop from "@/features/landing/components/LandingPageTop";
import MovingCategories from "@/features/landing/components/MovingCategories";
import SometimesTie from "@/features/landing/components/SometimesTie";
import SometimesWin from "@/features/landing/components/SometimesWin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const csrfToken = cookieStore.get("csrf-token")?.value ?? "";
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.BASE_URL}/api/cookie`, {
    method: "GET",
    headers: {
      cookie: cookieHeader,
      "x-csrf-token": csrfToken,
    },
  });

  const data = await res.json();

  if (data.success) {
    console.log("로그인 된 상태여서 홈페이지로 이동합니다");
    redirect("/homepage");
  } else {
    console.log("랜딩페이지에서 로그인 돼있지 않음");
  }

  return (
    <>
      <main>
        <div className="overflow-y-auto flex flex-col">
          {/* <img
          src="/signup_bg.jpg"
          alt="bgImage"
          className="absolute inset-0 w-full z-0 2xl:h-[1800px] lg:h-[1500px] md:h-[1204px] h-[1000px] pointer-events-none object-cover"
        /> */}
          <div className="bg-[url('/signup_bg.jpg')] bg-cover bg-center bg-no-repeat 2xl:h-[1800px] lg:h-[1500px] md:h-[1204px] h-[1000px] 2xl:px-[160px] lg:px-[100px] md:px-[50px] px-[24px]">
            <LandingPageTop />
            <HomePagePreview />
          </div>
        </div>

        <MovingCategories />

        <div className="2xl:px-[160px] lg:px-[100px] md:px-[50px] px-[24px]">
          <CategoryGrid />

          <AddProductModalIntro />
          <AddReviewModalIntro />

          <CompareProducts />
          <SometimesWin />
          <SometimesTie />
        </div>
      </main>

      <Footer />
    </>
  );
}
