import PageHeader from '@/components/PageHeader';
import { getAllSections } from '../_actions/getAllSections';
import SectionsTable from '../_components/SectionsTable';

export default async function SectionPart({
	params: { sectionType },
}: {
	params: { sectionType: string };
}) {
	let sections = await getAllSections(sectionType);

	return (
		<main dir='rtl'>
			<PageHeader
				title={
					sectionType === 'categories'
						? 'إعدادات الفئات'
						: 'إعدادات العلامات التجارية'
				}
			/>
			<SectionsTable data={sections} />
		</main>
	);
}
