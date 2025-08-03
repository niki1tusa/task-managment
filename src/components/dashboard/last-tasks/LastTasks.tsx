'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Title } from '@/components/ui/Title';

import type { TByAscOrDesc, TStatus, TTask } from '@/shared/types/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import FilterTask from './FilterTask';
import { Task } from './task/Task';
import { getClientAllTask } from '@/services/tasks/task-client.service';

export const LastTasks = ({ tasks }: { tasks: TTask[] }) => {
	const [select, setSelect] = useState<TStatus>('All');
	const [sortOrder, setSortOrder] = useState<TByAscOrDesc>('Asc');
	const {data} = useQuery({
		queryKey: ['last-task', select, sortOrder],
		queryFn: () => getClientAllTask({ status: select, sortByDue: sortOrder }),
		initialData: tasks
	});


	const count = data.length;
	return (
		<div className='flex flex-col gap-5'>
			<Title count={count}> Last Tasks </Title>
			<div className='flex justify-between'>
				<Link
					href={DASHBOARD_PAGES.ADD_TASK}
					className='hover:text-primary max-h-[41px] rounded-sm border border-white px-2 pt-2 text-sm font-medium text-gray-500 shadow shadow-neutral-400 transition-all duration-300'
				>
					+ Add Task
				</Link>
				<FilterTask
					select={select}
					setSelect={setSelect}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
				/>
			</div>

			<div className='grid grid-cols-1 gap-2 lg:grid-cols-3'>
				{count ? (
					data.map(task => <Task key={task.id} task={task} />)
				) : (
					<div>No tasks found.</div>
				)}
			</div>
		</div>
	);
};
