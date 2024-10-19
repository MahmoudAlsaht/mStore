import { OrderCard } from "../_components/OrderCard";
import { OrderCardProp, searchOrders } from "../_actions/searchOrders";
import OrdersTabs from "../_components/OrdersTabs";

export default async function OrdersPage({
  params: { status },
  searchParams: { search },
}: {
  params: {
    status: "all" | "pending" | "finished" | "rejected" | "canceled";
  };
  searchParams: { search: string };
}) {
  const { orders, user } = await searchOrders(status, search);

  return (
    <OrdersTabs userRole={user ? user.role : "anonymous"} search={search}>
      <div
        className="container mt-4 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        dir="rtl"
      >
        {orders?.map((order) => (
          <OrderCard
            key={order.id}
            user={user}
            order={order as OrderCardProp}
          />
        ))}
      </div>
    </OrdersTabs>
  );
}
