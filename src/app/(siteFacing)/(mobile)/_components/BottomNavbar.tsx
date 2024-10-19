import { checkUser } from "../../auth/_actions/isAuthenticated";
import BottomNavLinks from "./BottomNavLinks";
import { getPendingLength } from "../../orders/_actions/getOrders";

export default async function BottomNavbar() {
  const user = await checkUser();
  const pendingLength = await getPendingLength();

  return (
    <div className="fixed bottom-0 left-1/2 z-50 h-14 w-full max-w-lg -translate-x-1/2 border border-slate-300 bg-slate-200 text-slate-400">
      <BottomNavLinks pendingOrdersLength={pendingLength} user={user} />
    </div>
  );
}
