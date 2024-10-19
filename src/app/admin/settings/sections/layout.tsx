import { isEditor } from '@/app/(siteFacing)/auth/_actions/isAdmin';
import { ReactNode } from 'react';
import CustomBackButtonNav from './_components/CustomBackButtonNav';
import SectionNav from './_components/SectionNav';

export default async function SectionsSettingsLayout({
	children,
}: {
	children: ReactNode;
}) {
	await isEditor();

	return (
		<div>
			<CustomBackButtonNav />
			<SectionNav />
			{children}
		</div>
	);
}
