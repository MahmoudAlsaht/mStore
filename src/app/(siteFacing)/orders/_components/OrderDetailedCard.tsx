import { formatCurrency } from "@/lib/formatters";
import { LoadingLink } from "../../_context/LoadingContext";
import { OrderCardProp } from "../_actions/searchOrders";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type OrderDetailedCardProps = {
  statuses: {
    value: string;
    displayName: string;
    color?: string;
  }[];
  order: OrderCardProp | null;
  pickUpDate: string | null;
  deliveryTime: string | null;
  user: {
    id: string;
    phone: string;
    username: string;
    role: string;
    profile: {
      id: string;
    } | null;
  } | null;
  isUpdating: boolean;
  generateDisplayDate: () => string;
  handleRejectAndCancel: () => void;
  handleCompleteOrder: () => void;
};

export default function OrderDetailedCard({
  order,
  statuses,
  pickUpDate,
  deliveryTime,
  user,
  isUpdating,
  generateDisplayDate,
  handleCompleteOrder,
  handleRejectAndCancel,
}: OrderDetailedCardProps) {
  return (
    <div className="mx-auto flex flex-col justify-center gap-2 p-2 text-sm sm:text-lg md:text-xl">
      <h3>
        <span className="text-rayanSecondary-dark">رقم الطلب: </span>{" "}
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
      <h3>
        <span className="text-rayanSecondary-dark">طريقة الدفع: </span>{" "}
        <span className="text-rayanWarning-light">
          {order?.paymentMethod === "card"
            ? "عن طريق البطاقة"
            : order?.paymentMethod === "cash"
              ? "نقدا"
              : order?.paymentMethod === "eWallet"
                ? "عن طريق المحفظة"
                : "من المحل"}
        </span>
      </h3>
      {order?.pickUpDate && (
        <h3>
          <span className="text-rayanSecondary-dark">موعد الاستلام: </span>{" "}
          {pickUpDate}
        </h3>
      )}
      {order?.deliveryTime && (
        <h3>
          <span className="text-rayanSecondary-dark">موعد التوصيل: </span>{" "}
          {deliveryTime}
        </h3>
      )}
      <h3 className={order?.pickUpDate ? "text-rayanWarning-dark" : ""}>
        <span className="text-rayanSecondary-dark">
          {!order?.pickUpDate ? "المنطقة" : "فرع الاستلام"}:{" "}
        </span>
        {!order?.pickUpDate
          ? order?.contact?.district?.name
          : order?.pickUpStore}
      </h3>
      <h3>
        <span className="text-rayanSecondary-dark">اسم العميل: </span>
        {order?.clientName}
      </h3>
      <h3>
        <span className="text-rayanSecondary-dark">رقم التواصل: </span>
        {order?.contact?.contactNumber}
      </h3>
      {order?.note && (
        <h3 className="text-rayanWarning-light">
          <span className="text-rayanSecondary-dark">الملاحظات: </span>
          {order?.note}
        </h3>
      )}
      <div className="mt-4 flex">
        <span className="w-38 text-rayanSecondary-dark">تفاصيل الطلب: </span>
        <div className="mr-1">
          {order?.products.map((product) => (
            <LoadingLink
              target
              href={product?.productLink as string}
              key={product.id}
              className="text-sky-400 hover:underline"
            >
              <span>
                {product.name}{" "}
                <sup className="text-destructive">{product.counter}X</sup>
              </span>
            </LoadingLink>
          ))}
          <h3>
            <span className="text-rayanSecondary-dark">اجمالي الفاتورة: </span>
            {formatCurrency(parseFloat(order?.billTotal.toFixed(2) as string))}
          </h3>
          {order?.promoCode && order.promoCode.promoType === "productPrice" && (
            <>
              <h3 className="text-rayanWarning-dark">
                <span className="text-rayanSecondary-dark">كوبون: </span>
                {`(${order.promoCode.code}) خصم ${order.promoCode.discount}% على الفاتورة`}
              </h3>
              <h3 className="text-destructive">
                <span className="text-rayanSecondary-dark">
                  خُصم من الفاتورة:{" "}
                </span>
                -
                {formatCurrency(
                  parseFloat(
                    (
                      order.billTotal *
                      ((order.promoCode.discount || 0) / 100)
                    ).toFixed(2),
                  ),
                )}
              </h3>
            </>
          )}
          <h3>
            <span className="text-rayanSecondary-dark">التوصيل: </span>
            {order?.contact.district.shippingFees}
          </h3>
          {order?.promoCode && order.promoCode.promoType === "shippingFees" && (
            <>
              <h3 className="text-rayanWarning-dark">
                <span className="text-rayanSecondary-dark">كوبون: </span>
                {`(${order.promoCode.code}) خصم ${order.promoCode.discount}% على التوصيل`}
              </h3>
              <h3 className="text-destructive">
                <span className="text-rayanSecondary-dark">
                  خُصم من رسوم التوصيل:{" "}
                </span>
                -
                {formatCurrency(
                  parseFloat(
                    (
                      (order?.contact?.district?.shippingFees || 0) *
                      ((order.promoCode.discount || 0) / 100)
                    ).toFixed(2),
                  ),
                )}
              </h3>
            </>
          )}
          {order?.promoCode && (
            <h3 className="text-rayanWarning-dark">
              <span className="text-rayanSecondary-dark">
                اجمالي الطلب قبل الخصم:{" "}
              </span>
              {formatCurrency(
                parseFloat(
                  (
                    (order?.contact?.district?.shippingFees || 0) +
                    (order?.billTotal || 0)
                  ).toFixed(2) as string,
                ),
              )}
            </h3>
          )}

          <h3>
            <span className="text-rayanSecondary-dark">اجمالي الطلب: </span>
            {formatCurrency(parseFloat(order?.orderTotal.toFixed(2) as string))}
          </h3>
        </div>
      </div>
      <div
        className={`mt-4 ${user?.role === "customer" || user?.role === "staff" ? "mx-auto w-full sm:w-10/12 md:w-8/12 lg:w-6/12" : "flex gap-1"}`}
      >
        {user &&
          (user.role == "admin" ||
            user.role === "editor" ||
            user?.role === "customer") && (
            <Button
              disabled={isUpdating || order?.status !== "pending"}
              className={`w-full ${order?.status === "pending" ? (user.role === "customer" ? "bg-destructive" : "bg-pink-700") : "cursor-text bg-foreground"}`}
              onClick={handleRejectAndCancel}
            >
              {isUpdating ? (
                <Loader2 className="animate-spin text-rayanPrimary-dark" />
              ) : order?.status === "pending" ? (
                user.role === "customer" ? (
                  "الغاء الطلب"
                ) : (
                  "رفض الطلب"
                )
              ) : order?.status === "canceled" ? (
                user.role === "customer" ? (
                  "لقد قمت بالغاء هذا الطلب"
                ) : (
                  "الغي الطلب من قبل العميل"
                )
              ) : order?.status === "rejected" ? (
                user.role === "customer" ? (
                  "لقد تم رفض طلبك"
                ) : (
                  "تم الرفض"
                )
              ) : (
                "تم التسليم"
              )}
            </Button>
          )}
        {user && order?.status === "pending" && user.role !== "customer" && (
          <Button
            disabled={isUpdating}
            className="w-full bg-sky-600"
            onClick={handleCompleteOrder}
          >
            {order?.status === "pending" && isUpdating ? (
              <Loader2 className="animate-spin text-rayanPrimary-dark" />
            ) : (
              "إتمام التسليم"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
