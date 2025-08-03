'use client';

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

import { Title } from '@/components/ui/Title';

import type { TGetTasksResponse, TTask } from '@/shared/types/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';


import { ListSubTask } from '../../../../../components/dashboard/modals/ListSubTask';

interface Props {
	id: string;
	tasks: TGetTasksResponse[0];
}
export const ClientPage = ({ id, tasks }: Props) => {
	const findTask = tasks.find((item: TTask) => item.id === id) || tasks[0];
	return (
		<div className='px-5'>
			<div className='flex flex-col gap-1 p-6'>
				<Title>Add Sub Task</Title>
				<Link href={DASHBOARD_PAGES.DASHBOARD} className='flex gap-3'>
					<ArrowLeftCircle /> <span>Back to Dashboard</span>
				</Link>
				<p>task id "{id}"</p>
				<ListSubTask task={findTask} />
			</div>
		</div>
	);
};
