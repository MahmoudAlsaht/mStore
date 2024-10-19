'use client';
import { useFormState } from 'react-dom';
import { createNewDistrict } from '../_actions/createDistrict';
import SubmitButton from '@/components/SubmitButton';
import { editDistrict } from '../_actions/editDistrict';

export function DistrictForm({
	district,
}: {
	district?: {
		id: string;
		name: string;
		shippingFees: number;
	} | null;
}) {
	const [error, action] = useFormState(
		district == null
			? createNewDistrict
			: editDistrict.bind(null, district.id),
		{},
	);

	return (
		<form
			action={action}
			className='max-w-sm h-screen mx-4 sm:mx-auto'
		>
			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='text'
					name='name'
					id='name'
					defaultValue={district?.name}
					className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					placeholder=''
				/>
				<label
					htmlFor='name'
					className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
				>
					اسم المنطقة
				</label>
				{error?.name && (
					<div className='text-destructive'>
						{error.name}
					</div>
				)}
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='number'
					name='shippingFees'
					id='shippingFees'
					className='block no-arrows py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					placeholder=''
					defaultValue={district?.shippingFees}
					step='any'
				/>
				<label
					htmlFor='shippingFees'
					className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
				>
					تكلفة التوصيل
				</label>
				{error?.shippingFees && (
					<div className='text-destructive'>
						{error.shippingFees}
					</div>
				)}
			</div>

			<SubmitButton body={!district ? 'إضافة' : 'تعديل'} />
		</form>
	);
}
