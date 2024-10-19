import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@prisma/client';
import { Loader2, MoreHorizontal, X } from 'lucide-react';
import {
	deleteUser,
	updateUserRole,
} from '../_actions/updateUserRole';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function EditRoleForm({
	user,
}: {
	user: Partial<User>;
}) {
	const [dialog, setDialog] = useState('');

	const [role, setRole] = useState(user.role);
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<Dialog>
			<DropdownMenu dir='rtl'>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						className='h-8 w-8 p-0'
					>
						<span className='sr-only'>
							Open menu
						</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						onClick={() =>
							navigator.clipboard.writeText(
								user.phone as string,
							)
						}
					>
						نسخ رقم الهاتف
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => setDialog('edit')}
						className='text-rayanWarning-dark'
					>
						<DialogTrigger>
							تعديل الدور
						</DialogTrigger>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setDialog('delete')}
						className='text-rayanError-light'
					>
						<DialogTrigger>
							حذف المستخدم
						</DialogTrigger>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{dialog === 'edit' ? (
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle className='text-rayanSecondary-dark'>
							تعديل دور {user.username}
						</DialogTitle>
						<DialogDescription className='text-rayanWarning-dark'>
							({user.role}) هو الدور الحالي ل (
							{user.username})
						</DialogDescription>
					</DialogHeader>

					<div className='grid gap-4 py-4'>
						<div className='relative z-0 w-full mb-5 group'>
							<label
								htmlFor='countries'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Select your country
							</label>
							<select
								name='role'
								id='countries'
								className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3'
								onChange={(e) =>
									setRole(e.target.value)
								}
							>
								<option value={role}>
									{role}
								</option>
								{role !== 'editor' && (
									<option value='editor'>
										Editor
									</option>
								)}
								{role !== 'staff' && (
									<option value='staff'>
										Staff
									</option>
								)}
								{role !== 'customer' && (
									<option value='customer'>
										Customer
									</option>
								)}
							</select>
						</div>
						<DialogFooter>
							<Button
								disabled={
									isPending ||
									user.role === role
								}
								className='w-full'
								onClick={() => {
									startTransition(async () => {
										await updateUserRole(
											role as string,
											user.id as string,
										);
										router.refresh();
									});
								}}
							>
								{isPending ? (
									<Loader2 className='animate-spin text-rayanPrimary-dark dark:text-rayanPrimary-light' />
								) : (
									'حفظ'
								)}
							</Button>
						</DialogFooter>
					</div>
				</DialogContent>
			) : (
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle className='text-rayanSecondary-dark'>
							حذف {user.username}
						</DialogTitle>
						<DialogDescription className='text-destructive'>
							أنت على وشك حذف ({user.username})
						</DialogDescription>
					</DialogHeader>

					<div className='grid gap-4 py-4'>
						<DialogFooter>
							<Button
								disabled={isPending}
								variant='outline'
								className='w-full text-destructive bg-none hover:bg-destructive hover:text-white'
								onClick={() => {
									startTransition(async () => {
										await deleteUser(
											user.id as string,
										);
										router.refresh();
									});
								}}
							>
								{isPending ? (
									<Loader2 className='animate-spin text-rayanPrimary-dark dark:text-rayanPrimary-light' />
								) : (
									'حذف'
								)}
							</Button>
						</DialogFooter>
					</div>
				</DialogContent>
			)}
		</Dialog>
	);
}
