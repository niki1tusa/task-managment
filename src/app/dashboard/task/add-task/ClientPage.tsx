'use client';

import BackLink from '@/components/ui/BackLink';
import { Title } from '@/components/ui/Title';

export default function ClientPage() {
	return (
		<div className='px-5'>
			<div className='flex flex-col gap-1 p-6'>
				<Title>Add Task (client page)</Title>
				<BackLink text='Back to Dashboard' />
				<p>Add task</p>
			</div>
		</div>
	);
}
