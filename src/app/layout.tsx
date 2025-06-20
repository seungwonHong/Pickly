import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const mplus = M_PLUS_Rounded_1c({
  variable: "--font-mplus",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pickly",
  description:
    " Pickly is a next-generation product discovery platform where quality meets curation. Whether you’re searching for the latest gadgets, everyday essentials, or hidden gems, Pickly connects you with handpicked items trusted by real users.",
  icons: "/icons/favicon.png",
  openGraph: {
    title: "Pickly",
    description:
      "Discover and compare curated products trusted by real users. Experience the next generation of product discovery.",
    siteName: "Pickly",
    url: "https://pickly-gamma.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://pickly-gamma.vercel.app/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Pickly image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${mplus.variable} antialiased`}>
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="afterInteractive"
        />
        <QueryProvider>{children}</QueryProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(37, 37, 48, 0.8)",
              color: "#F1F1F5",
              borderRadius: "8px",
              border: "1px solid #353542",
            },
          }}
        />
      </body>
    </html>
  );
}
