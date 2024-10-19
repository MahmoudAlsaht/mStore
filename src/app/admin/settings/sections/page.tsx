import PageHeader from '@/components/PageHeader';
import { getAllSections } from './_actions/getAllSections';
import SectionsTable from './_components/SectionsTable';

export default async function SectionsSettingsPage() {
	const sections = await getAllSections();

	return (
		<main dir='rtl'>
			<PageHeader title='إعدادات الأقسام' />
			<SectionsTable data={sections} />
			<div className='h-20'></div>
		</main>
	);
}
