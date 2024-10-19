"use client";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/SubmitButton";
import { createNewProduct } from "../_actions/createNewProduct";
import Image from "next/image";
import { editProduct } from "../_actions/editProduct";
import { Section } from "@prisma/client";
import { useState } from "react";
import OfferDatePicker from "./OfferDatePicker";
import { DateRange } from "react-day-picker";
import NewSectionShortcutForm from "./NewSectionShortcutForm";

export function ProductForm({
  product,
  categories,
  brands,
}: {
  product?: {
    name: string;
    weights: number[] | null;
    flavors: string[] | null;
    category: {
      id: string;
      name: string;
    } | null;
    id: string;
    brand: {
      id: string;
      name: string;
    } | null;
    body: string;
    price: number;
    quantity: number;
    productType: string;
    description: string | null;
    isOffer: boolean;
    newPrice: number | null;
    offerStartsAt: Date | null;
    offerEndsAt: Date | null;
    image: {
      path: string;
    } | null;
  } | null;

  brands: Partial<Section>[];
  categories: Partial<Section>[];
}) {
  const [productType, setProductType] = useState<string | null>(
    product?.productType || null,
  );

  const [isOffer, setIsOffer] = useState(product?.isOffer);

  const [date, setDate] = useState<DateRange | undefined>({
    from: product?.offerStartsAt || undefined,
    to: product?.offerEndsAt || undefined,
  });

  const [newCategory, setNewCategory] = useState<{
    name: string;
    id: string;
  }>();
  const [newBrand, setNewBrand] = useState<{ name: string; id: string }>();

  const [error, action] = useFormState(
    product == null
      ? createNewProduct.bind(null, date)
      : editProduct.bind(null, date, product?.id as string),
    {},
  );
  return (
    <form
      action={action}
      className="container mx-auto h-[150dvh] max-w-sm sm:mx-auto"
    >
      <div className="flex gap-1">
        <div className="group relative z-0 mb-5 w-full">
          <NewSectionShortcutForm setSection={setNewCategory} type="category" />
          <select
            name="category"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            {product ? (
              <option
                value={product.category?.id != null ? product.category?.id : ""}
              >
                {product.category?.name}
              </option>
            ) : (
              <option value={newCategory?.id || ""}>
                {newCategory?.name || "اختر الفئة"}
              </option>
            )}
            {categories &&
              !newCategory &&
              categories.map((category) =>
                product ? (
                  product.category?.id !== category.id && (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                ) : (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ),
              )}
          </select>
          {error?.category && (
            <div className="text-destructive">{error?.category}</div>
          )}
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <NewSectionShortcutForm setSection={setNewBrand} type="brand" />
          <select
            name="brand"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            {product ? (
              <option
                value={product.brand?.id != null ? product.brand?.id : ""}
              >
                {product.brand?.name}
              </option>
            ) : (
              <option value={newBrand?.id || ""}>
                {newBrand?.name || "اختر العلامة"}
              </option>
            )}
            {brands &&
              !newBrand &&
              brands.map((brand) =>
                product ? (
                  product.brand?.id !== brand.id && (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  )
                ) : (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ),
              )}
          </select>
          {error?.brand && (
            <div className="text-destructive">{error?.brand}</div>
          )}
        </div>
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <select
          name="productType"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => setProductType(e.target.value)}
        >
          {product ? (
            <option value={product.productType}>
              {product.productType === "normal"
                ? "عادي"
                : product.productType === "forHome"
                  ? "منزلية"
                  : product.productType === "weights"
                    ? "منتج بالوزن"
                    : "نكهات"}
            </option>
          ) : (
            <option value="">اختر نوع المنتج</option>
          )}
          {product?.productType !== "normal" && (
            <option value="normal">عادي</option>
          )}
          {product?.productType !== "weight" && (
            <option value="weight">منتج بالوزن</option>
          )}
          {product?.productType !== "flavor" && (
            <option value="flavor">نكهات</option>
          )}
          {product?.productType !== "forHome" && (
            <option value="forHome">منزلية</option>
          )}
        </select>
        {error?.productType && (
          <div className="text-destructive">{error?.productType}</div>
        )}
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <input
          type="text"
          name="name"
          id="name"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
          defaultValue={product?.name}
        />
        <label
          htmlFor="name"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          الاسم المختصر
        </label>
        {error?.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <input
          type="text"
          name="body"
          id="body"
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
          defaultValue={product?.body}
        />
        <label
          htmlFor="body"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          الاسم
        </label>
        {error?.body && <div className="text-destructive">{error.body}</div>}
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <input
          type="number"
          name="price"
          id="price"
          className="no-arrows peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
          defaultValue={product?.price}
          step="any"
        />
        <label
          htmlFor="price"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          {productType === "weight" ? "السعر للكيو الواحد" : "السعر"}
        </label>
        {error?.price && <div className="text-destructive">{error.price}</div>}
      </div>

      {(productType === "weight" || productType === "flavor") && (
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="options"
            id="options"
            className="no-arrows peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
            placeholder=""
            defaultValue={
              productType === "weight"
                ? product?.weights?.join(" ")
                : productType === "flavor"
                  ? product?.flavors?.join(" ")
                  : ""
            }
            step="any"
          />
          <label
            htmlFor="options"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            {productType === "weight" ? "الأوزان" : "النكهات"}
          </label>
          <div className="text-rayanWarning-dark">
            استعمل احد هذه الرموز للفصل بين الخيارات <br />
            (/{"  "}
            {"  "}-\,)
          </div>
          {error?.options && (
            <div className="text-destructive">{error.options}</div>
          )}
        </div>
      )}

      <div className="group relative z-0 mb-5 w-full">
        <input
          type="number"
          name="quantity"
          id="quantity"
          className="no-arrows peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
          placeholder=""
          defaultValue={product?.quantity}
        />
        <label
          htmlFor="quantity"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          العدد المتوفر
        </label>
        {error?.quantity && (
          <div className="text-destructive">{error.quantity}</div>
        )}
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          وصف المنتج
        </label>
        <textarea
          id="description"
          rows={4}
          name="description"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="وصف المنتج..."
          defaultValue={product?.description || ""}
        />
        {error?.description && (
          <div className="text-destructive">{error?.description}</div>
        )}
      </div>

      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          name="isOffer"
          onChange={(e) => setIsOffer(e.target.checked)}
          checked={isOffer}
        />
        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">
          {isOffer ? "الغي العرض" : "قدم عرضا"}
        </span>
      </label>

      {isOffer && (
        <>
          <div className="group relative z-0 mb-5 mt-3 w-full">
            <input
              type="number"
              name="newPrice"
              id="newPrice"
              className="no-arrows peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
              placeholder=""
              defaultValue={product?.newPrice || ""}
              step="any"
            />
            <label
              htmlFor="newPrice"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              {productType === "weight"
                ? "السعر الجديد للكيو الواحد"
                : "السعر الجديد"}
            </label>
            {error?.newPrice && (
              <div className="text-destructive">{error.newPrice}</div>
            )}
          </div>
          <div>
            <OfferDatePicker date={date} setDate={setDate} />
          </div>
        </>
      )}

      <div className="group relative z-0 mb-5 w-full">
        <label className="mb-2 block text-gray-900" htmlFor="productImage">
          تحميل صورة المنتج
        </label>
        <input
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="productImage"
          name="productImage"
          type="file"
        />
        <p className="text-rayanWarning-dark">min width: 307.2px</p>
        <p className="text-rayanWarning-dark">min height: 320px</p>
        {product && (
          <Image
            alt={product?.name as string}
            src={product?.image?.path.replace("/upload", "/upload/w_100") || ""}
            width={100}
            height={100}
            className="mt-2 h-full w-1/3"
          />
        )}
        {error?.productImage && (
          <div className="text-destructive">{error.productImage}</div>
        )}
      </div>

      <SubmitButton body={product == null ? "إضافة" : "تعديل"} />
    </form>
  );
}
