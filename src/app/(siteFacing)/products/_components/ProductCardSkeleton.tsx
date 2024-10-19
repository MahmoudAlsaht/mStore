import { Button } from "@/components/ui/button";

export function DetailsProductSkeleton() {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-16">
      <div className="mx-auto mt-6 h-96 w-9/12 animate-pulse rounded-3xl bg-gray-400 object-cover pt-10 md:mx-0 md:mr-24 md:h-4/6 md:w-5/12" />
      <div className="flex w-full animate-pulse flex-col items-center gap-6 md:mt-16 md:w-3/4 md:items-start">
        <Button disabled className="h-4 w-6/12"></Button>
        <Button disabled className="h-4 w-6/12"></Button>
        <Button disabled className="h-4 w-6/12"></Button>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="h-80 animate-pulse cursor-pointer rounded-xl border-x-2 border-b-2 border-slate-300 bg-gray-400 shadow-md shadow-slate-200" />
  );
}
