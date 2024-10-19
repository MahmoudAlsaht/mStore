"use client";
import { ChangeEvent, ReactNode, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GrAtm } from "react-icons/gr";
import { GiTakeMyMoney } from "react-icons/gi";
import EWalletIcon from "@/app/icons8-e-wallet-48.png";
import Image from "next/image";
import SubmitButton from "@/components/SubmitButton";
import { createNewOrder } from "../../orders/_actions/createNewOrder";
import { useFormState } from "react-dom";
import DayTimePicker from "./DayTimePicker";
import { DeliveryTime } from "@prisma/client";
import {
  getHours,
  setMinutes,
  setHours,
  getMinutes,
  addMinutes,
  isAfter,
} from "date-fns";
import { se } from "date-fns/locale";

function isValidSelection(selectedHour: number): boolean {
  const currentDate = new Date();
  const selectedDate = setMinutes(setHours(currentDate, selectedHour), 0);

  const timeDifference = addMinutes(currentDate, 45);
  return isAfter(selectedDate, timeDifference);
}

export default function SelectPayment({
  deliveryTimes,
}: {
  deliveryTimes: DeliveryTime;
}) {
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickUp">(
    "delivery",
  );
  const [deliveryTime, setDeliveryTime] = useState<Date | undefined>();

  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "cash" | "eWallet"
  >("cash");
  const [date, setDate] = useState<Date | undefined>();

  const [error, action] = useFormState(
    createNewOrder.bind(
      null,
      deliveryMethod === "delivery" ? deliveryTime : undefined,
      deliveryMethod === "pickUp" ? date : undefined,
    ),
    null,
  );

  const handleSelectDelivery = (e: ChangeEvent<HTMLSelectElement>) => {
    const now = Date.now();
    const selected = setHours(now, parseInt(e.target.value));
    if (getHours(now) === getHours(selected) && getMinutes(now) > 15) {
      const toursIndex = deliveryTimes.tours.indexOf(parseInt(e.target.value));
      const selected = setHours(
        now,
        toursIndex + 1 === deliveryTimes.tours.length
          ? deliveryTimes.tours[0]
          : deliveryTimes.tours[toursIndex],
      );
      setDeliveryTime(setMinutes(selected, 0));
      return;
    }
    setDeliveryTime(setMinutes(selected, 0));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "payment" | "delivery",
  ) => {
    if (type === "delivery")
      setDeliveryMethod(e.target.value === "pickUp" ? "pickUp" : "delivery");
    if (type === "payment")
      setPaymentMethod(
        e.target.value === "eWallet"
          ? "eWallet"
          : e.target.value === "card"
            ? "card"
            : "cash",
      );
  };

  return (
    <form
      action={action}
      className="h-full w-full p-4 sm:w-1/2 md:w-1/3"
      dir="rtl"
    >
      <RadioGroup
        defaultValue={deliveryMethod}
        name="deliveryMethod"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e, "delivery")
        }
      >
        <RadioCard value="delivery" htmlFor="delivery">
          توصيل{" "}
        </RadioCard>
        <RadioCard value="pickUp" htmlFor="pickUp">
          استلام من الفرع
        </RadioCard>
      </RadioGroup>
      {error?.deliveryMethod && (
        <div className="text-destructive">{error?.deliveryMethod}</div>
      )}
      {deliveryMethod === "pickUp" && (
        <>
          <div className="group relative z-0 mb-5 w-full">
            <select
              name="storeToPickUpFrom"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">اختر الفرع</option>
              {["شارع القدس", "حكما", "حنينا", "المطارق"].map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
            {error?.storeToPickUpFrom && (
              <div className="text-destructive">{error?.storeToPickUpFrom}</div>
            )}
          </div>
          <div className="group relative z-0 mb-5 w-full">
            <DayTimePicker selected={date} setSelected={setDate} />
          </div>
          {error?.pickUpDate && (
            <div className="mt-2 text-destructive">{error.pickUpDate}</div>
          )}
        </>
      )}

      <div className="group relative z-0 mb-5 w-full">
        <label
          htmlFor="note"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          تعليمات اضافية
        </label>
        <textarea
          id="note"
          rows={4}
          name="note"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="اكتب أي تعليمات اضافية"
        />
      </div>

      {deliveryMethod === "delivery" && (
        <>
          {deliveryTimes != null && (
            <div className="group relative z-0 mb-5 w-full">
              <p className="mb-2 text-rayanWarning-dark">
                أوقات التوصيل من الساعة {deliveryTimes.start} و حتى الساعة{" "}
                {deliveryTimes.end}
              </p>
              <select
                name="deliveryTime"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                onChange={handleSelectDelivery}
              >
                <option value="">اختر وقت التوصيل</option>
                {deliveryTimes.tours.map((tour, i) => (
                  <option
                    disabled={!isValidSelection(tour)}
                    value={tour}
                    key={`${i}-${deliveryTimes.id}-${tour}`}
                  >
                    {` ${tour === 0 ? 12 : tour > 0 && tour < 12 ? tour : tour - 12}:00${tour >= 0 && tour < 12 ? "am" : "pm"} `}{" "}
                  </option>
                ))}
              </select>
              {error?.deliveryTime && (
                <div className="text-destructive">{error.deliveryTime}</div>
              )}
            </div>
          )}
          <RadioGroup
            name="paymentMethod"
            defaultValue={paymentMethod}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, "payment")
            }
          >
            <RadioCard value="cash" htmlFor="الدفع (نقدا) عند الاستلام">
              <div>
                الدفع <span className="text-rayanWarning-dark">( نقدا )</span>{" "}
                عند الاستلام
              </div>
              <GiTakeMyMoney size="20" />
            </RadioCard>

            <RadioCard value="card" htmlFor="الدفع (بالبطاقة) عند الاستلام">
              <div>
                الدفع{" "}
                <span className="text-rayanWarning-dark">( بالبطاقة )</span> عند
                الاستلام
              </div>
              <GrAtm size="20" />
            </RadioCard>
            <RadioCard value="eWallet" htmlFor="الدفع عن طريق المحفظة">
              <span>الدفع عن طريق المحفظة</span>
              <Image
                alt="e-wallet icon"
                src={EWalletIcon}
                width={20}
                height={20}
              />
            </RadioCard>
          </RadioGroup>
          {error?.paymentMethod && (
            <div className="text-destructive">{error.paymentMethod}</div>
          )}
        </>
      )}
      <SubmitButton className="mt-2" body="تنفيذ الطلب" />
    </form>
  );
}

function RadioCard({
  children,
  value,
  htmlFor,
}: {
  children: ReactNode;
  value: string;
  htmlFor: string;
}) {
  return (
    <div className="flex h-10 justify-between rounded-lg border-2 border-slate-400 bg-slate-50 p-2">
      <RadioGroupItem value={value} id={htmlFor} />
      <Label
        htmlFor={htmlFor}
        className="flex items-center justify-between gap-4 text-sm"
      >
        {children}
      </Label>
    </div>
  );
}
