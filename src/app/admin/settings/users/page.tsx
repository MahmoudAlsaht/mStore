import BackButtonNav from "@/components/BackButtonNav";
import { getAllUsers } from "./_actions/getAllUsers";
import UsersTable from "./_components/UsersTable";
import PageHeader from "@/components/PageHeader";

export default async function UsersSettingsPage() {
  const users = await getAllUsers();
  return (
    <main dir="rtl">
      <BackButtonNav href="/admin" />
      <PageHeader title="إعدادات المستخدمين" />
      <UsersTable data={users} />
    </main>
  );
}
