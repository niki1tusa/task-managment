'use client';

import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';

import { Title } from '@/components/ui/Title';

import { PAGE } from '@/config/dashboardDASHBOARD_PAGEconfig';

import { useTaskStore } from '@/store/store';

import { ListSubTask } from '../ListSubTask';

interface Props {
	id: string;
}
export default function ClientPage({ id }: Props) {
	const tasks = useTaskStore(state => state.tasks);
	const findTask = tasks.find(item => item.id === id) || tasks[0];
	return (
		<div className='px-5'>
			<div className='flex flex-col gap-1 p-6'>
				<Title>Add Sub Task</Title>
				<Link href={DASHBOARD_PAGEDASHBOARD} className='flex gap-3'>
					<ArrowLeftCircle /> <span>Back to Dashboard</span>
				</Link>
				<p>task id "{id}"</p>
				<ListSubTask task={findTask} />
			</div>
		</div>
	);
}
