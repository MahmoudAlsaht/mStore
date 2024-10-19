import db from "@/db/db";
import BackButtonNav from "@/components/BackButtonNav";
import { Button } from "@/components/ui/button";
import { addHours } from "date-fns";
import { checkUser } from "@/app/(siteFacing)/auth/_actions/isAuthenticated";
import ProductsContainer from "../../_components/ProductsContainer";
import { Suspense } from "react";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";
import { DetailsProductSkeleton } from "../../_components/ProductCardSkeleton";
import ProductCardDetails from "../../_components/ProductCardDetails";
import { ProductCartProvider } from "@/app/(siteFacing)/_context/ProductCartContext";

const selectProduct = {
  id: true,
  name: true,
  labels: true,
  description: true,
  body: true,
  price: true,
  newPrice: true,
  productType: true,
  offerStartsAt: true,
  offerEndsAt: true,
  weights: true,
  flavors: true,
  isOffer: true,
  quantity: true,
  image: {
    select: {
      path: true,
    },
  },
};

const getLabels = async (labels: string[], id: string) => {
  db.product.updateMany({
    where: {
      offerEndsAt: {
        lt: addHours(new Date(), 3),
      },
    },
    data: {
      newPrice: null,
      isOffer: false,
      offerStartsAt: null,
      offerEndsAt: null,
    },
  });

  db.product.updateMany({
    where: {
      offerStartsAt: {
        gt: addHours(new Date(), 3),
      },
    },
    data: {
      isOffer: false,
    },
  });

  db.product.updateMany({
    where: {
      AND: [
        {
          offerStartsAt: {
            lte: addHours(new Date(), 3),
          },
        },
        {
          offerEndsAt: {
            gt: addHours(new Date(), 3),
          },
        },
      ],
    },
    data: {
      isOffer: true,
    },
  });

  if (!labels) return;
  let allProductLabels: any[] = [];
  for (const value of labels) {
    const label = await db.label.findFirst({
      where: { value },
      select: {
        id: true,
        value: true,
        products: {
          where: { NOT: { id } },
          select: selectProduct,
        },
      },
    });
    if (label && label.products.length > 0) {
      allProductLabels.push(label);
    }
  }

  return [
    ...new Map(allProductLabels.map((label) => [label["id"], label])).values(),
  ];
};

export type ProductCardProps = {
  id: string | null;
  image: {
    path: string;
  } | null;
  name: string | null;
  price: number | null;
  newPrice: number | null;
  productType: string;
  description?: string | null;
  body?: string | null;
  weights: number[] | null;
  flavors: string[] | null;
  isOffer: boolean | null;
  quantity: number;
};

export default function ProductsTypePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="sm:hidden">
        <BackButtonNav />
      </div>
      <div className="hidden sm:block">
        <BackButtonNav />
      </div>

      <Suspense fallback={<DetailsProductSkeleton />}>
        <ProductDetailsPageSuspense id={id} />
      </Suspense>
      <div className="h-20"></div>
    </>
  );
}

async function ProductDetailsPageSuspense({ id }: { id: string }) {
  const user = await checkUser();
  const product = await db.product.findUnique({
    where: { id },
    select: selectProduct,
  });

  const labels = (await getLabels(
    product?.labels?.map((label) => label.value) as string[],
    id,
  )) as {
    id: string;
    value: string;
    products: any[];
  }[];

  return (
    <>
      {user && (user.role === "admin" || user.role === "editor") && (
        <Button className="w-full">
          <LoadingLink
            href={`/admin/settings/products/${product?.id as string}`}
          >
            تعديل المنتج
          </LoadingLink>
        </Button>
      )}

      <div className="mb-32">
        <ProductCartProvider id={product?.id as string}>
          <ProductCardDetails product={product as ProductCardProps} />
        </ProductCartProvider>
      </div>

      {labels && labels.length > 0 && (
        <div>
          <h2 className="mb-6 text-center text-lg sm:text-3xl">
            منتجات مشابهة
          </h2>
          {labels?.map((label) => (
            <div key={label.id}>
              <h3 className="text-md text-center sm:text-2xl">{label.value}</h3>
              <ProductsContainer products={label.products} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
