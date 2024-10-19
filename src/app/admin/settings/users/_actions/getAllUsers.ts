'use server';

import db from '@/db/db';

export const getAllUsers = async () => {
	const users = await db.user.findMany({
		where: { role: { not: 'admin' } },
		select: {
			id: true,
			username: true,
			phone: true,
			role: true,
		},
	});

	return users.map((user, index) => ({
		...user,
		index: index + 1,
	}));
};
