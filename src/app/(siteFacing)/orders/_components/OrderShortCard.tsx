import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { LoadingLink } from "../../_context/LoadingContext";
import { OrderCardProp } from "../_actions/searchOrders";

type ShortCardProps = {
  statuses: {
    value: string;
    displayName: string;
    color?: string;
  }[];
  order: OrderCardProp | null;
  generateDisplayDate: () => string;
};
export default function OrderShortCard({
  order,
  statuses,
  generateDisplayDate,
}: ShortCardProps) {
  return (
    <div className="rounded-2xl bg-white p-4 duration-500 hover:scale-105">
      <div className="flex flex-col justify-center gap-2 p-2">
        <h3>
          <span className="text-rayanSecondary-dark">رقم الطلب:</span>{" "}
          {order?.orderId}
        </h3>
        {statuses.map(
          (status) =>
            status.value === order?.status && (
              <h3
                className={`${status.color}`}
                key={`${order?.id} - ${order?.status}`}
              >
                <span className="text-rayanSecondary-dark">الحالة:</span>{" "}
                {status.displayName}
              </h3>
            ),
        )}
        <h3>
          <span className="text-rayanSecondary-dark">منذ: </span>{" "}
          {generateDisplayDate()}
        </h3>
        <LoadingLink
          className="flex items-center text-sky-400"
          href={`/orders/${order?.status}/${order?.id}`}
        >
          تفاصيل الطلب <MdOutlineKeyboardArrowLeft size={30} />
        </LoadingLink>
      </div>
    </div>
  );
}
