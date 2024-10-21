import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
export default function LoginCredentialAlert() {
  return (
    <Alert
      dir="ltr"
      className="mx-auto mb-6 w-6/12 border-mStoreWarning-dark bg-inherit text-mStoreWarning-dark sm:w-8/12 lg:w-6/12"
    >
      <Info className="h-4 w-4" style={{ color: "#f97316" }} />
      <AlertTitle>
        if you want to test Admin Dashboard use these credential:
      </AlertTitle>
      <AlertDescription className="mt-2 text-mStorePrimary-dark">
        <div>
          <span className="font-extrabold text-black">Phone: </span>0781234567
        </div>
        <div>
          <span className="font-extrabold text-black">Password: </span>123456
        </div>
      </AlertDescription>
    </Alert>
  );
}
