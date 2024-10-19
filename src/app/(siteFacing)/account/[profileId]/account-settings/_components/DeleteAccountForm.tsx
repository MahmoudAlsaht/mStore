'use client';
import SubmitButton from '@/components/SubmitButton';
import { useFormState } from 'react-dom';
import { deleteAccount } from '../_actions/deleteAccount';
import PageHeader from '@/components/PageHeader';

export default function DeleteAccountForm({
	profileId,
}: {
	profileId: string;
}) {
	const [error, action] = useFormState(
		deleteAccount.bind(null, profileId),
		{},
	);
	return (
		<>
			<PageHeader title='حذف الحساب' />

			<form
				action={action}
				className='max-w-sm mx-4 sm:mx-auto'
			>
				<div className='relative z-0 w-full mb-5 group'>
					<input
						type='password'
						name='password'
						id='password'
						className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
						placeholder=''
					/>
					<label
						htmlFor='password'
						className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						كلمة المرور الحالية
					</label>
					{error?.password && (
						<div className='text-destructive'>
							{error?.password}
						</div>
					)}
				</div>

				<SubmitButton
					destructive
					body={'تأكيد حذف الحساب'}
				/>
			</form>
		</>
	);
}
