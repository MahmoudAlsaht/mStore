"use client";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";

import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { completeOrder, rejectOrCancelOrder } from "../_actions/updateOrder";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { OrderCardProp } from "../_actions/searchOrders";
import OrderShortCard from "./OrderShortCard";
import OrderDetailedCard from "./OrderDetailedCard";

const statuses: {
  value: string;
  displayName: string;
  color?: string;
}[] = [
  {
    value: "all",
    displayName: "جميع الطلبات",
    color: "",
  },
  {
    value: "pending",
    displayName: "قيد المعالجة",
    color: "text-rayanWarning-dark",
  },
  {
    value: "finished",
    displayName: "تمت",
    color: "text-sky-600",
  },
  {
    value: "rejected",
    displayName: "مرفوضة",
    color: "text-pink-700",
  },
  {
    value: "canceled",
    displayName: "ملغية",
    color: "text-destructive",
  },
];

export function OrderCard({
  order,
  isOrderDetailsPage = false,
  user,
}: {
  order: OrderCardProp | null;
  isOrderDetailsPage?: boolean;
  user: {
    id: string;
    phone: string;
    username: string;
    role: string;
    profile: {
      id: string;
    } | null;
  } | null;
}) {
  const [isUpdating, startTransition] = useTransition();
  const router = useRouter();

  const now = new Date();
  const formattedDate = format(order?.createdAt as Date, "yyyy/MM/dd");
  const minutesPassed = differenceInMinutes(now, order?.createdAt as Date);
  const hoursPassed = differenceInHours(now, order?.createdAt as Date);
  const daysPassed = differenceInDays(now, order?.createdAt as Date);
  const pickUpDate = order?.pickUpDate
    ? format(order?.pickUpDate as Date, "yyyy/MM/dd الساعة (hh:mm a)")
    : null;

  const deliveryTime = order?.deliveryTime
    ? format(order?.deliveryTime as Date, "yyyy/MM/dd الساعة (hh:mm a)")
    : null;

  const generateDisplayDate = () =>
    minutesPassed >= 60
      ? hoursPassed >= 24
        ? daysPassed >= 30
          ? formattedDate
          : daysPassed === 1
            ? "يوم"
            : daysPassed === 2
              ? "يومين"
              : daysPassed > 2 && daysPassed < 11
                ? `${daysPassed} أيام`
                : `${daysPassed} يوماََ`
        : hoursPassed === 1
          ? "ساعة"
          : hoursPassed === 2
            ? "ساعتين"
            : hoursPassed > 2 && hoursPassed < 11
              ? `${hoursPassed} ساعات`
              : `${hoursPassed} ساعة`
      : minutesPassed < 1
        ? "أقل من دقيقة"
        : minutesPassed === 1
          ? "دقيقة"
          : minutesPassed === 2
            ? "دقيقتين"
            : minutesPassed > 2 && minutesPassed < 11
              ? `${minutesPassed} دقائق`
              : `${minutesPassed} دقيقة`;

  const handleRejectAndCancel = () => {
    startTransition(async () => {
      await rejectOrCancelOrder(
        order?.id as string,
        user?.role === "customer" ? "canceled" : "rejected",
      );
      router.refresh();
    });
  };

  const handleCompleteOrder = () => {
    startTransition(async () => {
      await completeOrder(order?.id as string, "finished");
      router.refresh();
    });
  };

  return !isOrderDetailsPage ? (
    <OrderShortCard
      generateDisplayDate={generateDisplayDate}
      order={order}
      statuses={statuses}
    />
  ) : (
    <OrderDetailedCard
      pickUpDate={pickUpDate}
      deliveryTime={deliveryTime}
      generateDisplayDate={generateDisplayDate}
      order={order}
      statuses={statuses}
      user={user}
      isUpdating={isUpdating}
      handleCompleteOrder={handleCompleteOrder}
      handleRejectAndCancel={handleRejectAndCancel}
    />
  );
}
