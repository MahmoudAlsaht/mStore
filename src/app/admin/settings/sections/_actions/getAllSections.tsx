'use server';

import db from '@/db/db';

export async function getAllSections(filterType = 'all') {
	if (filterType === 'all') {
		const sections = await db.section.findMany({
			select: {
				id: true,
				name: true,
				type: true,
				cover: {
					select: {
						path: true,
					},
				},
				sectionBanners: {
					select: {
						path: true,
					},
				},
			},
		});

		const selectedSections = sections.map(
			(section, index) => ({
				id: section.id,
				index: index + 1,
				name: section.name,
				cover: section.cover?.path,
				type: section.type,
				bannerImage:
					section.sectionBanners?.length > 0
						? section.sectionBanners[0].path
						: 'no image',
			}),
		);
		return selectedSections;
	}

	const sections = await db.section.findMany({
		where: {
			type: filterType,
		},
		select: {
			id: true,
			name: true,
			type: true,
			cover: {
				select: {
					path: true,
				},
			},
			sectionBanners: {
				select: {
					path: true,
				},
			},
		},
	});

	const selectedSections = sections.map((section, index) => ({
		id: section.id,
		index: index + 1,
		name: section.name,
		cover: section.cover?.path,
		type: section.type,
		bannerImage:
			section.sectionBanners?.length > 0
				? section.sectionBanners[0].path
				: 'no image',
	}));
	return selectedSections;
}
