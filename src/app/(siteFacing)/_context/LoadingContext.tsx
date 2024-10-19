"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, ReactNode, useTransition } from "react";

type LoadingContextType = {
  startLoading: (cb: any) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  startLoading: (cb: any) => {},
});

export function useStartLoading() {
  return useContext(LoadingContext);
}

type LoadingProviderProps = {
  children: ReactNode;
  AdminNavbar: ReactNode;
  SiteFacingNavbar: ReactNode;
  MobileNavBar: ReactNode;
};

export default function LoadingProvider({
  children,
  AdminNavbar,
  SiteFacingNavbar,
  MobileNavBar,
}: LoadingProviderProps) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const value = {
    startLoading: (cb: () => any) => {
      startTransition(async () => {
        await cb();
      });
    },
  };

  return (
    <LoadingContext.Provider value={value}>
      {
        <>
          <main className="flex flex-col">
            <div className="z-50 hidden sm:block">
              {pathname.includes("/admin") && AdminNavbar}
              {!pathname.includes("/admin") && SiteFacingNavbar}
            </div>
            {isPending && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-200">
                <Loader2 className="size-24 animate-spin text-rayanPrimary-dark" />
              </div>
            )}
            {!isPending && <main>{children}</main>}

            <main className="sm:hidden">{MobileNavBar}</main>
          </main>
        </>
      }
    </LoadingContext.Provider>
  );
}

export function LoadingLink({
  href,
  className,
  children,
  type = "link",
  target = false,
  action,
}: {
  target?: boolean;
  href: string | (() => void);
  action?: () => void;
  className?: string;
  children: ReactNode;
  type?: string;
}) {
  const router = useRouter();
  const { startLoading } = useStartLoading();

  const handleStartLoading = () =>
    startLoading(() => {
      if (action) action();
      if (typeof href === "function") href();
      else !target ? router.push(href) : window.open(href, "_blank");
    });

  return type === "link" ? (
    <div className={`cursor-pointer ${className}`} onClick={handleStartLoading}>
      {children}
    </div>
  ) : (
    (type === "button" || type === "submit") && (
      <Button type={type} className={`cursor-pointer ${className}`} size="icon">
        {children}
      </Button>
    )
  );
}
