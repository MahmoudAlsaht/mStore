'use server';

import db from '@/db/db';

export const getAllDistricts = async () => {
	const districts = await db.district.findMany({
		select: {
			id: true,
			name: true,
			shippingFees: true,
		},
	});

	return districts.map((district, index) => ({
		...district,
		index: index + 1,
	}));
};
