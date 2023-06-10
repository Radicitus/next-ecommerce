import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/FormatPrice";
import Image from "next/image";
import { prisma } from "@/util/prisma";

export const revalidate = 0;

const fetchOrders = async () => {
  const user = await getServerSession(authOptions);

  if (!user) {
    console.log("User not logged in.");
    return null;
  }

  // Find all orders for user
  return prisma.order.findMany({
    where: {
      // @ts-ignore
      // Errors due to manual overloading of userSession type
      userId: user?.user?.id,
      status: "complete",
    },
    include: {
      products: true,
    },
  });
};

export default async function Dashboard() {
  const orders = await fetchOrders();

  if (orders === null) {
    return <h1>Not Logged In</h1>;
  }

  if (orders.length === 0) {
    return <h1>No Orders Placed!</h1>;
  }

  return (
    <div className="pb-12">
      <h1>Your Orders</h1>
      <div className="font-medium">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg p-8 my-4 bg-base-200
            hover:bg-primary-content hover:scale-105 hover:shadow-2xl hover:text-primary
            transition duration-300 ease-in-out"
          >
            <h2 className="text-xs font-medium">Order Reference: {order.id}</h2>
            <p className="text-xs py-2">
              Status:{" "}
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
                } text-white py-1 rounded-md px-2 mx-2 text-sm`}
              >
                {order.status}
              </span>
            </p>
            <p className="text-xs">Time: {order.createdAt.toDateString()}</p>

            <div className="text-sm lg:flex">
              {order.products.map((product) => (
                <div key={product.id} className="py-2 lg:mr-3">
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image!}
                      width={36}
                      height={36}
                      alt={product.name}
                      className="rounded-md w-auto"
                      priority={true}
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <p>Total: {formatPrice(order.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
