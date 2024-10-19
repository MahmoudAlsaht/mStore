import BackButtonNav from "@/components/BackButtonNav";
import { getAllDistricts } from "./_actions/getAllDistricts";
import DistrictsTable from "./_components/DistrictsTable";
import PageHeader from "@/components/PageHeader";

export default async function DistrictsPage() {
  const districts = await getAllDistricts();
  return (
    <main dir="rtl">
      <BackButtonNav href="/admin" />
      <PageHeader title="المناطق المدعومة" />
      <DistrictsTable data={districts} />
      <div className="h-20"></div>
    </main>
  );
}
