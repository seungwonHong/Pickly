import HomePage from "./homepage/page";

export default function Home({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div>
      <main>
        <HomePage params={params} searchParams={searchParams} />
      </main>
    </div>
  );
}
