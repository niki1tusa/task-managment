'use client';

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

import { Title } from '@/components/ui/Title';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import { observer } from 'mobx-react-lite';

import { ListSubTask } from '../../../../../components/dashboard/modals/ListSubTask';
import { taskStore } from '@/store/task.store';

interface Props {
	id: string;
}
export const  ClientPage = observer(({ id }: Props)=> {
	const tasks = taskStore.tasks
	const findTask = tasks.find(item => item.id === id) || tasks[0];
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
}
)