import db from "@/db/db";
import { checkUser } from "../../auth/_actions/isAuthenticated";
import { redirect } from "next/navigation";
import {
  Anonymous,
  Contact,
  District,
  OrderProduct,
  Profile,
  PromoCode,
} from "@prisma/client";

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

export type OrderCardProp = {
  id: string;
  billTotal: number;
  orderId: string;
  status: string;
  paymentMethod: string;
  orderTotal: number;
  createdAt: Date;
  promoCode: Partial<PromoCode>;
  profile: Partial<Profile>;
  anonymous: Partial<Anonymous>;
  products: Partial<OrderProduct>[];
  contact: Partial<Contact> & { district: Partial<District> };
  note: string | null;
  pickUpDate: Date | null;
  pickUpStore: string | null;
  deliveryTime: Date | null;
  clientName: string;
};

export const select = {
  id: true,
  orderId: true,
  billTotal: true,
  status: true,
  paymentMethod: true,
  orderTotal: true,
  createdAt: true,
  pickUpDate: true,
  pickUpStore: true,
  deliveryTime: true,
  promoCode: { select: { discount: true, promoType: true, code: true } },
  profile: true,
  anonymous: true,
  products: true,
  note: true,
  contact: {
    select: {
      contactNumber: true,
      district: { select: { name: true, shippingFees: true } },
    },
  },
};

export async function searchOrders(
  status: string | undefined,
  query: string | undefined,
) {
  const user = await checkUser();
  if (!user) redirect("/");

  const orders = await filterOrders(
    user.role !== "customer" ? "authorized" : "customer",
    user.id,
    query,
    status,
  );
  return { user, orders };
}

async function filterOrders(
  userRole: "authorized" | "customer",
  userId: string,
  query: string | undefined,
  status: string | undefined,
) {
  return userRole === "authorized"
    ? await db.order.findMany({
        where: {
          AND: [
            !query ? {} : { orderId: { contains: query } },
            status === "all" || !status ? {} : { status },
          ],
        },
        select,
        orderBy: { createdAt: "desc" },
      })
    : await db.order.findMany({
        where: {
          AND: [
            { profile: { userId } },
            { orderId: query !== "" ? { contains: query } : {} },
          ],
        },
        select,
        orderBy: { createdAt: "desc" },
      });
}
