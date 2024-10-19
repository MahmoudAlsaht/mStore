import { isEditor } from '@/app/(siteFacing)/auth/_actions/isAdmin';
import { ReactNode } from 'react';

export default async function ProductsSettingsLayout({
	children,
}: {
	children: ReactNode;
}) {
	await isEditor();

	return <div>{children}</div>;
}
