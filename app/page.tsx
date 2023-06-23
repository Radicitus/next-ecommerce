import { Analytics } from "@vercel/analytics/react";
import Home from "@/app/components/Home";

export default async function Main() {
  return (
    <main>
      <Home />
      <Analytics />
    </main>
  );
}
