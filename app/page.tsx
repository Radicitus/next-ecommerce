import Product from "@/app/components/Product";
import { Analytics } from "@vercel/analytics/react";
import getProducts from "@/util/GetProducts";

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="grid grid-cols-fluid gap-16">
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
      <Analytics />
    </main>
  );
}
