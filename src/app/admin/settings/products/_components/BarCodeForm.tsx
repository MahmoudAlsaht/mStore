"use client";
import { Button } from "@/components/ui/button";
import { BarCode } from "@prisma/client";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { createNewBarCodes } from "../[id]/barCodes/_actions/createNewBarCodes";
import { deleteBarCode } from "../[id]/barCodes/_actions/deleteBarCode";

export default function BarCodeForm({
  barCodes,
  productId,
}: {
  barCodes: BarCode[] | undefined;
  productId: string;
}) {
  const router = useRouter();
  const [selectedBarCodes, setSelectedBarCodes] = useState<
    { value: string; id?: number }[]
  >([]);
  const [isPending, startTransition] = useTransition();

  const barCodeRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    startTransition(async () => {
      const formData = new FormData();
      for (const barCode of selectedBarCodes) {
        formData.append("barCodes", barCode.value);
      }
      await createNewBarCodes(formData, productId);
      setSelectedBarCodes([]);
      router.refresh();
    });
  };

  const addToSelectedBarCode = async () => {
    if (barCodeRef.current!.value === "") return;
    await setSelectedBarCodes((prevBarCodes) => [
      ...prevBarCodes,
      { value: barCodeRef.current?.value as string },
    ]);
    setSelectedBarCodes((prevBarCodes) => {
      return prevBarCodes.map((barCode, index) => {
        return { value: barCode.value, id: index };
      });
    });
    barCodeRef.current!.value = "";
  };

  const handleDeleteSelectedBarCodes = (id: number) => {
    setSelectedBarCodes((prevBarCode) => {
      return prevBarCode.filter((barCode) => barCode.id !== id);
    });
  };

  const handleDeleteCurrentBarCodes = (id: string) => {
    startTransition(async () => {
      await deleteBarCode(productId, id);
      router.refresh();
    });
  };

  return (
    <div className="mx-4 h-[150dvh] max-w-sm sm:mx-auto">
      <div className="group relative z-0 mb-5 flex w-full">
        <input
          type="text"
          name="barCode"
          id="barCode"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
          ref={barCodeRef}
          onKeyDownCapture={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addToSelectedBarCode();
            }
          }}
        />
        <label
          htmlFor="barCode"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          أدخل الكود
        </label>
        <Button
          variant="ghost"
          size="sm"
          className="mt-1"
          onClick={() => addToSelectedBarCode()}
        >
          إدخال
        </Button>
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <Button onClick={handleClick} className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "حفظ"}
        </Button>
      </div>

      <div className="flex text-center sm:gap-10">
        <div>
          {barCodes && barCodes.length > 0 && <h1>الأكواد الحالية</h1>}
          <div className="mb-4 flex w-1/2 flex-col">
            {barCodes &&
              barCodes.map((barCode) => (
                <BarCodePill
                  isPending={isPending}
                  key={barCode.id}
                  id={barCode.id}
                  value={barCode.value}
                  handleDelete={handleDeleteCurrentBarCodes}
                />
              ))}
          </div>
        </div>

        <div>
          {selectedBarCodes && selectedBarCodes.length > 0 && (
            <h1>الأكواد الجديدة</h1>
          )}
          <div className="mb-4 flex w-1/2 flex-col">
            {selectedBarCodes &&
              selectedBarCodes.map((barCode, index) => (
                <BarCodePill
                  isPending={isPending}
                  key={barCode.id || index}
                  id={barCode.id || index}
                  value={barCode.value}
                  handleDelete={handleDeleteSelectedBarCodes}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BarCodePill({
  id,
  value,
  handleDelete,
  isPending = false,
}: {
  id: string | number | null;
  value: string | null;
  handleDelete: (id: any) => void;
  isPending: boolean;
}) {
  return (
    <div
      key={id || ""}
      className="relative mt-2 inline-flex items-center rounded-lg border-none bg-none py-2 pl-2 pr-8 text-center text-sm font-medium text-rayanSecondary-dark focus:ring-4"
    >
      {value}
      <div className="absolute -start-[-5px] inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-xs font-bold text-red-500">
        <Trash2 onClick={() => !isPending && handleDelete(id)} />
      </div>
    </div>
  );
}
