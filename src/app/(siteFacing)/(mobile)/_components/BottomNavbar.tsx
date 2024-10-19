import { checkUser } from "../../auth/_actions/isAuthenticated";
import BottomNavLinks from "./BottomNavLinks";
import { getPendingLength } from "../../orders/_actions/getOrders";

export default async function BottomNavbar() {
  const user = await checkUser();
  const pendingLength = await getPendingLength();

  return (
    <div className="bg-mStorePrimary-dark/20 border-mStorePrimary-dark/15 text-mStoreInfo-dark fixed bottom-0 left-1/2 z-50 h-14 w-full max-w-lg -translate-x-1/2 border">
      <BottomNavLinks pendingOrdersLength={pendingLength} user={user} />
    </div>
  );
}
