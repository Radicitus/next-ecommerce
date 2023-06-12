import "./globals.css";
import Nav from "@/app/components/Nav";
import Hydrate from "@/app/components/Hydrate";
import { Roboto, Lobster_Two } from "next/font/google";

// Define fonts
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
const lobster = Lobster_Two({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata = {
  title: "Cam.Shop",
  description: "A next-gen e-commerce platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className="h-full transition duration-700"
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Cam.Shop</title>
      </head>

      <body
        className={`mx-4 lg:mx-48 h-full ${roboto.variable} ${lobster.variable}`}
      >
        <Hydrate>
          <Nav />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
