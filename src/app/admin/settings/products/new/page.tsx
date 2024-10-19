import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";
import { ProductForm } from "../_components/ProductForm";
import db from "@/db/db";

export default async function NewProduct() {
  const brands = await db.section.findMany({
    where: { type: "brands" },
    select: { name: true, id: true },
  });

  const categories = await db.section.findMany({
    where: { type: "categories" },
    select: { name: true, id: true },
  });

  return (
    <main dir="rtl">
      <BackButtonNav />
      <PageHeader title="إضافة منتج" />

      <ProductForm brands={brands} categories={categories} />
    </main>
  );
}
