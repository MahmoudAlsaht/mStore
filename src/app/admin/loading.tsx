import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="text-mStorePrimary-dark dark:text-mStorePrimary-light size-24 animate-spin" />
    </div>
  );
}
