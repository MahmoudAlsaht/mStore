"use client";

import { Button } from "@/components/ui/button";
import { MoveRight, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error(error.message);
  }, [error]);

  if (process.env.NODE_ENV === "production") router.push("/notFound");
  return (
    <main
      className="flex h-screen flex-col items-center justify-center text-4xl text-rayanSecondary-dark sm:text-6xl"
      dir="rtl"
    >
      <div className="mx-auto px-4 py-8 text-center text-2xl lg:py-16">
        <div className="mb-8 text-destructive">
          <h6 className="">name: {error.name}</h6>
        </div>
        <h1 className="mb-4 leading-none tracking-tight text-destructive">
          {error.message}
        </h1>

        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <Button
            className="bg-rayanSecondary-dark px-8 dark:bg-rayanSecondary-light"
            size="lg"
          >
            <RefreshCcw className="ml-4" />
            أعد المحاولة
          </Button>
        </div>
        <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <Button
            className="bg-rayanSecondary-dark px-8 dark:bg-rayanSecondary-light"
            size="lg"
            onClick={() => router.replace("/")}
          >
            <MoveRight className="ml-4" />
            الرئيسية{" "}
          </Button>
        </div>
      </div>
    </main>
  );
}
