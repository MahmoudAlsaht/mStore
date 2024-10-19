'use server';
import db from '@/db/db';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export async function updateUserRole(role: string, id: string) {
	const user = await db.user.findUnique({ where: { id } });

	if (user == null) return notFound();

	await db.user.update({
		where: { id },
		data: {
			role: role as string,
		},
	});
}

export async function deleteUser(id: string) {
	const user = await db.user.findUnique({ where: { id } });

	if (user == null) return notFound();

	await db.user.delete({ where: { id } });

	revalidatePath('/admin/settings/users');
}
