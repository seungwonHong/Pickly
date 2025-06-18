import Header from "@/components/shared/Header";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        <Header />
      </header>
      <main>{children}</main>
    </>
  );
}
