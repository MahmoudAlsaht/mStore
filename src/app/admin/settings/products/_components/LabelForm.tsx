"use client";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Label } from "@prisma/client";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { createNewLabels } from "../[id]/labels/_actions/createNewLabel";
import { deleteLabel } from "../[id]/labels/_actions/deleteLabel";

export default function LabelForm({
  labels,
  productId,
}: {
  labels: Label[] | undefined;
  productId: string;
}) {
  const router = useRouter();
  const [selectedLabels, setSelectedLabels] = useState<
    { value: string; id?: number }[]
  >([]);
  const [isPending, startTransition] = useTransition();

  const labelRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    startTransition(async () => {
      const formData = new FormData();
      for (const label of selectedLabels) {
        formData.append("labels", label.value);
      }
      await createNewLabels(formData, productId);
      setSelectedLabels([]);
      router.refresh();
    });
  };

  const addToSelectedLabel = async () => {
    if (labelRef.current!.value === "") return;
    await setSelectedLabels((prevLabels) => [
      ...prevLabels,
      { value: labelRef.current?.value as string },
    ]);
    setSelectedLabels((prevLabels) => {
      return prevLabels.map((label, index) => {
        return { value: label.value, id: index };
      });
    });
    labelRef.current!.value = "";
  };

  const handleDeleteSelectedLabels = (id: number) => {
    setSelectedLabels((prevLabels) => {
      return prevLabels.filter((label) => label.id !== id);
    });
  };

  const handleDeleteCurrentLabels = (id: string) => {
    startTransition(async () => {
      await deleteLabel(productId, id);
      router.refresh();
    });
  };

  return (
    <div className="mx-4 h-[150dvh] max-w-sm sm:mx-auto">
      {labels && labels.length > 0 && <h1>الكلمات الحالية</h1>}
      <div className="mb-4 grid grid-cols-4 gap-1">
        {labels &&
          labels.map((label) => (
            <LabelPill
              isPending={isPending}
              key={label.id}
              id={label.id}
              value={label.value}
              handleDelete={handleDeleteCurrentLabels}
            />
          ))}
      </div>

      {selectedLabels && selectedLabels.length > 0 && <h1>الكلمات الجديدة</h1>}
      <div className="mb-4 grid grid-cols-4 gap-1">
        {selectedLabels &&
          selectedLabels.map((label, index) => (
            <LabelPill
              isPending={isPending}
              key={label.id || index}
              id={label.id || index}
              value={label.value}
              handleDelete={handleDeleteSelectedLabels}
            />
          ))}
      </div>
      <div className="group relative z-0 mb-5 flex w-full">
        <input
          type="text"
          name="label"
          id="label"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
          ref={labelRef}
          onKeyDownCapture={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addToSelectedLabel();
            }
          }}
        />
        <label
          htmlFor="label"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          الكلمات المفتاحية
        </label>
        <Button
          variant="ghost"
          size="sm"
          className="mt-1"
          onClick={() => addToSelectedLabel()}
        >
          إدخال
        </Button>
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <Button onClick={handleClick} className="w-full" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "حفظ"}
        </Button>
      </div>
    </div>
  );
}

function LabelPill({
  id,
  value,
  handleDelete,
  isPending = false,
}: {
  isPending: boolean;
  id: string | number | null;
  value: string | null;
  handleDelete: (id: any) => void;
}) {
  return (
    <div
      key={id || ""}
      className="relative mt-2 inline-flex items-center rounded-lg border border-rayanSecondary-dark bg-none py-2 pl-2 pr-8 text-center text-sm font-medium text-rayanSecondary-dark focus:ring-4"
    >
      {value}
      <div className="absolute -start-[-5px] inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-xs font-bold text-red-500">
        <Trash2 onClick={() => !isPending && handleDelete(id)} />
      </div>
    </div>
  );
}
