'use client';

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

import { PAGE } from '@/config/page.config';

import { useTaskStore } from '@/store/store';

interface Props {
	id: string;
}
export default function ClientPage({ id }: Props) {
	const tasks = useTaskStore(state => state.tasks);
	const findTask = tasks.find(item => item.id === id) || tasks[0];
	return (
		<div className='border'>
			<div className='flex flex-col gap-1 p-6'>
				<h2 className='text-xl font-medium'>Edit Task</h2>
				<Link href={PAGE.DASHBOARD} className='flex gap-3'>
					<ArrowLeftCircle /> <span>Back to Dashboard</span>
				</Link>
				<p>task id "{id}"</p>
				<div>
					{findTask.subTask.map(subtask => (
						<div key={subtask.id}>
							<span>Subtask name: {subtask.title}</span>
							<span>Subtask status: {subtask.isCompleted}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
