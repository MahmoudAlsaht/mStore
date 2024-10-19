import { getUserPermission } from "@/app/admin/_components/UserPermissions";
import BackButtonNav from "../../../../components/BackButtonNav";
import OptionsList from "./_components/OptionsList";

export default async function OptionsPage() {
  const user = await getUserPermission();

  return (
    <>
      <BackButtonNav goHome />
      <main dir="rtl" className="sm:hidden">
        <OptionsList {...user} />
      </main>
    </>
  );
}
