'use client';

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

import { Task } from '@/components/dashboard/last-tasks/task/Task';
import { Title } from '@/components/ui/Title';

import type { TGetTasksResponse, TTask } from '@/shared/types/task/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import { ListSubTask } from '../../../../../components/dashboard/modals/ListSubTask';

interface Props {
	id: string;
	tasks: TGetTasksResponse[0];
}
export const EditClient = ({ id, tasks }: Props) => {
	const findTask = tasks.find((item: TTask) => item.id === id) || tasks[0];
	return (
		<div className='px-5 py-3'>
			<div className='flex flex-col gap-3 p-6'>
				<Title>Edit Task</Title>
				<Link href={DASHBOARD_PAGES.DASHBOARD} className='flex gap-3'>
					<ArrowLeftCircle /> <span className='border-b-2'>Back to Dashboard</span>
				</Link>
				<h2>Task id &rdquo;{id}&rdquo;</h2>
				<div className='w-[60%]'>
					<Task task={findTask} />
				</div>
				<ListSubTask task={findTask} />
			</div>
		</div>
	);
};
