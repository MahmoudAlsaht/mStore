import { Suspense } from "react";
import Banner from "./_components/Banner";
import ProductsHomeContainer, {
  HomeProductSkeleton,
} from "./_components/ProductsHomeContainer";
import SectionsHomeContainer from "./_components/SectionsHomeContainer";
import { SectionsContainerSkeleton } from "./sections/_components/SectionsContainer";

export default async function Home() {
  return (
    <main className="h-full">
      <Suspense>
        <Banner type="main" />
      </Suspense>

      <Suspense fallback={<SectionsContainerSkeleton count={4} />}>
        <SectionsHomeContainer type="categories" />
      </Suspense>

      <Suspense fallback={<HomeProductSkeleton />}>
        <ProductsHomeContainer type="purchases" />
      </Suspense>

      <Suspense fallback={<HomeProductSkeleton />}>
        <ProductsHomeContainer type="newest offers" />
      </Suspense>

      <Suspense fallback={<HomeProductSkeleton />}>
        <ProductsHomeContainer type="views" />
      </Suspense>

      <Suspense fallback={<SectionsContainerSkeleton count={4} />}>
        <SectionsHomeContainer type="brands" />
      </Suspense>
      <div className="h-20"></div>
    </main>
  );
}
