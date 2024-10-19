'use client';
import { useFormState } from 'react-dom';
import { createNewUser } from '../../_actions/createUser';
import SubmitButton from '@/components/SubmitButton';

export function NewUserForm() {
	const [error, action] = useFormState(createNewUser, {});

	return (
		<form
			action={action}
			className='max-w-sm h-screen mx-4 sm:mx-auto'
		>
			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='tel'
					name='phone'
					id='phone'
					className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					placeholder=''
				/>
				<label
					htmlFor='phone'
					className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
				>
					الهاتف
				</label>
				{error?.phone && (
					<div className='text-destructive'>
						{error.phone}
					</div>
				)}
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='text'
					name='username'
					id='username'
					className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					placeholder=''
				/>
				<label
					htmlFor='username'
					className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
				>
					الاسم
				</label>
				{error?.username && (
					<div className='text-destructive'>
						{error?.username}
					</div>
				)}
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<select
					name='role'
					className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3'
				>
					<option value=''>اختر الدور</option>
					<option value='editor'>Editor</option>
					<option value='staff'>Staff</option>
					<option value='customer'>Customer</option>
				</select>
				{error?.role && (
					<div className='text-destructive'>
						{error?.role}
					</div>
				)}
			</div>

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
					كلمة المرور
				</label>
				{error?.password && (
					<div className='text-destructive'>
						{error?.password}
					</div>
				)}
			</div>

			<div className='relative z-0 w-full mb-5 group'>
				<input
					type='password'
					name='confirmPassword'
					id='confirmPassword'
					className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
					placeholder=''
				/>
				<label
					htmlFor='confirmPassword'
					className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
				>
					تأكيد كلمة المرور
				</label>
				{error?.confirmPassword && (
					<div className='text-destructive'>
						{error?.confirmPassword}
					</div>
				)}
			</div>
			<SubmitButton body='إضافة' />
		</form>
	);
}
