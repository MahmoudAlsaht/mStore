import SectionCard, {
  SectionCardProps,
  SectionCardSkeleton,
} from "./SectionCard";

export default function SectionsContainer({
  sections,
}: {
  sections: SectionCardProps[];
}) {
  return (
    <section
      dir="rtl"
      className="mb-5 grid w-full grid-cols-4 gap-x-1 gap-y-5 bg-inherit sm:gap-x-2 sm:gap-y-5 sm:py-6 md:grid-cols-5 md:gap-2 lg:grid-cols-6"
    >
      {sections.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}
    </section>
  );
}

export function SectionsContainerSkeleton({ count = 12 }: { count?: number }) {
  return (
    <section className="mb-5 grid h-full w-full grid-cols-4 gap-1 bg-inherit sm:py-6 md:grid-cols-5 lg:grid-cols-6">
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <SectionCardSkeleton key={i} />
      ))}
    </section>
  );
}
