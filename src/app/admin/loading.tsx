import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
	return (
		<div className='flex justify-center items-center h-screen'>
			<Loader2 className='size-24 animate-spin text-rayanPrimary-dark dark:text-rayanPrimary-light' />
		</div>
	);
}
