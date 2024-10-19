import { MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";

export default function OfflinePage() {
  return (
    <div
      className="container flex h-screen items-center justify-center overflow-hidden bg-rayanSecondary-dark py-10"
      dir="ltr"
    >
      <div className="text-center">
        <h1 className="mb-4 flex items-center justify-center gap-1 text-xl font-bold sm:text-4xl">
          <span>
            <MdOutlineSignalWifiStatusbarConnectedNoInternet4 />
          </span>
          لم يتم العثور على اتصال
        </h1>
        <p className="text:md text-slate-300 sm:text-lg">
          يرجى التحقق من اتصالك بالإنترنت و المحاولة مرةََ أخرى
        </p>
      </div>
    </div>
  );
}
