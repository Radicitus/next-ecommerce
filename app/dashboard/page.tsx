import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/util/FormatPrice";
import Image from "next/image";

const fetchOrders = async () => {
  const prisma = new PrismaClient();
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
    },
    include: {
      products: true,
    },
  });
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  console.log(orders);

  if (orders === null) {
    return <h1>Not Logged In</h1>;
  }

  if (orders.length === 0) {
    return <h1>No Orders Placed!</h1>;
  }

  return (
    <div>
      <h1>Your Orders</h1>
      <div className="font-medium">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg">
            <h2>Order Reference: {order.id}</h2>
            <p>Time: {order.createdAt.toTimeString()}</p>
            <p className="font-medium py-2">
              Status:{" "}
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
                } text-white py-1 rounded-md px-2 mx-2 text-sm`}
              >
                {order.status}
              </span>
            </p>
            <p className="font-medium">Total: {formatPrice(order.amount)}</p>
            <div className="flex gap-8">
              {order.products.map((product) => (
                <div key={product.id} className="py-2">
                  <h2>{product.name}</h2>
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image!}
                      width={36}
                      height={36}
                      alt={product.name}
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
