"use client";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/SubmitButton";
import { createNewOption } from "../_actions/createNewOption";
import { editOption } from "../_actions/editOption";

export function OptionForm({
  productOption,
  productId,
}: {
  productOption?: {
    name: string;
    id: string;
    price: number;
  } | null;
  productId: string;
}) {
  const [error, action] = useFormState(
    !productOption
      ? createNewOption.bind(null, productId)
      : editOption.bind(null, productOption.id),
    {},
  );
  return (
    <form
      action={action}
      className="container mx-auto h-[150dvh] max-w-sm sm:mx-auto"
    >
      <div className="group relative z-0 mb-5 w-full">
        <input
          type="text"
          name="name"
          id="name"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
          defaultValue={productOption?.name}
        />
        <label
          htmlFor="name"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          الاسم
        </label>
        {error?.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <input
          type="number"
          name="price"
          id="price"
          className="no-arrows peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
          defaultValue={productOption?.price}
          step="any"
        />
        <label
          htmlFor="price"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          السعر{" "}
        </label>
        {error?.price && <div className="text-destructive">{error.price}</div>}
      </div>

      <SubmitButton body={!productOption ? "إضافة" : "تعديل"} />
    </form>
  );
}
