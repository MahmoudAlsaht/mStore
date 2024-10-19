"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";

export function OptionLink({
  href,
  icon,
  displayName,
}: {
  href: string | (() => void);
  icon: ReactNode;
  displayName: string;
}) {
  return (
    <LoadingLink
      href={href}
      className={cn(
        "flex px-4 py-3 hover:bg-rayanPrimary-light hover:text-black",
      )}
    >
      <span className="ml-4">{icon}</span>
      {displayName}
    </LoadingLink>
  );
}
