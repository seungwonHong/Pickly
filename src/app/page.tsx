import HomePage from "./homepage/page";
import LandingPage from "./landingpage/page";

export default function Home({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div>
      <main>
        <LandingPage />
      </main>
    </div>
  );
}
