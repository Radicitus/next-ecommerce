import { Analytics } from "@vercel/analytics/react";
import Home from "@/app/components/Home";

export default async function Main() {
  return (
    <main className="h-full w-full">
      <Home />
      <Analytics />
    </main>
  );
}
