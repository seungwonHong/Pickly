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
<<<<<<< HEAD
        <HomePage params={params} searchParams={searchParams} />
=======
        <LandingPage />
>>>>>>> 50cd9e1597e6f7cd44d8082cbaf4c01018d11518
      </main>
    </div>
  );
}
