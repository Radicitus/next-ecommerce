import "./globals.css";
import Nav from "@/app/components/Nav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "@/app/components/Hydrate";
import { Roboto } from "next/font/google";

// Define fonts
const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the user
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" data-theme="light">
      <body className={`mx-4 lg:mx-48 ${roboto.className}`}>
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
