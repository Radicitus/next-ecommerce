import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

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
          </div>
        ))}
      </div>
    </div>
  );
}
