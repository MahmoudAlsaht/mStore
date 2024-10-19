import BackButtonNav from "@/components/BackButtonNav";
import PageHeader from "@/components/PageHeader";
import db from "@/db/db";
import { SectionForm } from "../../_components/SectionForm";
import { redirect } from "next/navigation";

export default async function EditSectionPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const section = await db.section.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      type: true,
      cover: { select: { path: true } },
      sectionBanners: {
        select: {
          id: true,
          path: true,
          link: true,
        },
      },
      mobileSectionBanners: {
        select: {
          id: true,
          path: true,
          link: true,
        },
      },
    },
  });
  return (
    <main dir="rtl">
      <PageHeader title={`تعديل ${section?.name}`} />
      <SectionForm section={section} />
    </main>
  );
}
