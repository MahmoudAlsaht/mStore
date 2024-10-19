import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import { BannerForm } from "../_components/BannerForm";

export default async function EditBannerPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const banner = await db.banner.findUnique({
    where: { id },
    select: {
      id: true,
      bannerType: true,
      images: { select: { path: true, id: true, link: true } },
      mobileImages: { select: { path: true, id: true, link: true } },
    },
  });

  return (
    <main dir="rtl">
      <BackButtonNav />
      <PageHeader
        title={
          banner?.bannerType === "offers"
            ? "تعديل لافتة قسم العروض"
            : banner?.bannerType === "forHome"
              ? "تعديل لافتة قسم المنزلية"
              : "تعديل اللافتة الرئيسية"
        }
      />

      <BannerForm banner={banner} />
    </main>
  );
}
