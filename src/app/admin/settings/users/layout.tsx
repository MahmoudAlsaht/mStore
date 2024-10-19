import { isAdmin } from '@/app/(siteFacing)/auth/_actions/isAdmin';
import { ReactNode } from 'react';

export default async function UserSettingsLayout({
	children,
}: {
	children: ReactNode;
}) {
	await isAdmin();

	return <div>{children}</div>;
}
