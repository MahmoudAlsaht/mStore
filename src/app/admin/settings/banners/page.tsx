import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";
import { getAllBanners } from "./_actions/getAllBanners";
import BannersTable from "./_components/BannersTable";

export default async function BannersSettingsPage() {
  const banners = await getAllBanners();

  return (
    <main dir="rtl">
      <BackButtonNav href="/admin" />
      <PageHeader title="إعدادات اللافتات" />

      <BannersTable data={banners} />
      <div className="h-20"></div>
    </main>
  );
}
