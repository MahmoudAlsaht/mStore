import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";
import { getAllProducts } from "./_actions/getAllProducts";
import ProductsTable from "./_components/ProductsTable";

export default async function ProductsSettingsPage() {
  const products = await getAllProducts();

  return (
    <main dir="rtl">
      <BackButtonNav href="/admin" />
      <PageHeader title="إعدادات المنتجات" />

      <ProductsTable data={products} />
      <div className="h-20"></div>
    </main>
  );
}
