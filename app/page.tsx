import Product from "@/app/components/Product";
import { Analytics } from "@vercel/analytics/react";
import getProducts from "@/util/GetProducts";

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="flex flex-wrap gap-8 lg:gap-16 pb-12 justify-center">
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
      <Analytics />
    </main>
  );
}
