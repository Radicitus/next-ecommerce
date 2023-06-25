import "./globals.css";
import Nav from "@/app/components/Static/Nav";
import Hydrate from "@/app/components/Util/Hydrate";
import { Roboto, Lobster_Two } from "next/font/google";
import Footer from "@/app/components/Static/Footer";

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
    <html lang="en" data-theme="light" className="transition duration-700">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Cam.Shop</title>
      </head>

      <body
        className={`flex flex-col min-h-screen ${roboto.variable} ${lobster.variable}`}
      >
        <div className="mx-4 lg:mx-24">
          <Hydrate>
            <Nav />
            {children}
          </Hydrate>
        </div>
        <Footer />
      </body>
    </html>
  );
}
