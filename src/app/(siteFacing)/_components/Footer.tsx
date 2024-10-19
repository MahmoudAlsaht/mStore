"use client";
import { usePathname } from "next/navigation";
import ContactUs from "./ContactUs";

export default function Footer() {
  const pathname = usePathname();

  return (
    !pathname.includes("/products") && (
      <footer className="hidden w-full rounded-t-md bg-slate-300/15 pb-6 pt-8 sm:block">
        <ContactUs />
      </footer>
    )
  );
}
