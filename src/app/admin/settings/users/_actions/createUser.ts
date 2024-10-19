'use server';
import db from '@/db/db';
import { hashPassword } from '@/lib/hashPassword';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const phoneNumberRegex = /^(07[789]\d{7})$/;

const addSchema = z
	.object({
		phone: z
			.string()
			.regex(
				phoneNumberRegex,
				'رقم الهاتف المدخل غير صحيح!',
			),
		username: z.string().min(1, 'يجب تحديد اسم المستخدم!'),
		password: z
			.string()
			.min(6, 'كلمة المرور يجب ان لا تكون اقل من 6 خانات'),
		confirmPassword: z
			.string()
			.min(
				6,
				'كلمة المرور يجب ان لا تكون اقل من 6 خانات &',
			),
		role: z
			.string()
			.min(1, 'يجب أن تقوم باختيار دور للمستخدم!'),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: ' يجب أن تتطابق كلمتي المرور ',
				path: ['confirmPassword', 'password'],
			});
		}
	});

export const createNewUser = async (
	_pervState: unknown,
	formData: FormData,
) => {
	const result = await addSchema.safeParse(
		Object.fromEntries(formData.entries()),
	);

	if (result.success === false) {
		return result.error.formErrors.fieldErrors;
	}

	const data = result.data;

	const user = await db.user.findUnique({
		where: { phone: data.phone },
	});

	if (user !== null)
		return {
			phone: 'هذا الهاتف مسجل بالفعل',
			username: '',
			password: '',
			confirmPassword: '',
			role: '',
		};

	const newUser = await db.user.create({
		data: {
			phone: data.phone,
			username: data.username,
			password: await hashPassword(data.password),
			role: data.role,
		},
	});

	const profile = await db.profile.create({
		data: {
			userId: newUser.id,
		},
	});

	await db.user.update({
		where: {
			id: newUser.id,
		},
		data: {
			profileId: profile.id,
		},
	});

	redirect('/admin/settings/users');
};
