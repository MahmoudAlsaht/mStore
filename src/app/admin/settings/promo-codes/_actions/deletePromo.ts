'use server';
import db from '@/db/db';

export async function deletePromo(id: string) {
	await db.promoCode.delete({
		where: { id },
	});
}
