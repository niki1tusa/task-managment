'use client';

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

import { Task } from '@/components/dashboard/last-tasks/task/Task';
import { Title } from '@/components/ui/Title';

import { DASHBOARD_PAGES } from '@/config/dashboardPage.config';

import { useTaskStore } from '@/store/store';

import { ListSubTask } from '../ListSubTask';

interface Props {
	id: string;
}
export default function ClientPage({ id }: Props) {
	const tasks = useTaskStore(state => state.tasks);
	const findTask = tasks.find(item => item.id === id) || tasks[0];
	return (
		<div className='px-5 py-3'>
			<div className='flex flex-col gap-3 p-6'>
				<Title>Edit Task</Title>
				<Link href={DASHBOARD_PAGES.DASHBOARD} className='flex gap-3'>
					<ArrowLeftCircle /> <span className='border-b-2'>Back to Dashboard</span>
				</Link>
				<h2>Task id "{id}"</h2>
				<div className='w-[60%]'>
					<Task task={findTask} />
				</div>
				<ListSubTask task={findTask} />
			</div>
		</div>
	);
}
