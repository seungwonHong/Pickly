import HomePage from "./homepage/page";

export default function Home({ params }: { params: { id: string } }) {
  return (
    <div>
      <main>
        <HomePage params={params}/>
      </main>
    </div>
  )
}
