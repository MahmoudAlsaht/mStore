import Privacy from "../../../components/Privacy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
};

export default function PrivacyPolicy() {
  return (
    <div
      className="h-full w-full overflow-scroll p-1 sm:container sm:w-8/12 sm:p-5"
      dir="rtl"
    >
      <Privacy />
    </div>
  );
}
