'use server';

import db from '@/db/db';

export async function deleteLabel(
	productId: string,
	labelId: string,
) {
	const product = await db.product.findUnique({
		where: { id: productId },
		select: { labelIds: true },
	});

	await db.product.update({
		where: { id: productId },
		data: {
			labelIds: product?.labelIds.filter(
				(id) => id !== labelId,
			),
		},
	});
}
