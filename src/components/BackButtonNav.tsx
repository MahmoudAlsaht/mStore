"use client";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButtonNav({
  goHome,
  href = "",
}: {
  goHome?: boolean;
  href?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-inherit pb-2">
        <div className="mx-auto flex h-14 flex-wrap items-center justify-between p-4">
          <Button
            data-collapse-toggle="navbar-default"
            type="button"
            variant="outline"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-inherit p-2 text-sm text-rayanPrimary-dark"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() =>
              !goHome
                ? href === ""
                  ? router.back()
                  : router.replace(href !== pathname ? href : "/")
                : router.replace("/")
            }
          >
            <span className="sr-only">Go Back One Page</span>
            <ArrowRight />
          </Button>
        </div>
      </nav>
    </>
  );
}
