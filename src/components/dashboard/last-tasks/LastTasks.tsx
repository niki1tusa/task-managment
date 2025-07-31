'use client';

import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Title } from '@/components/ui/Title';

import type { TTask } from '@/shared/types/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import { taskStore } from '@/store/task.store';

import FilterTask from './FilterTask';
import { Task } from './task/Task';

// warn - Error: can't access property "filter", data.sub_task is undefined
export const LastTasks = observer(() => {
	const [select, setSelect] = useState(null);
	const [sortOrder, setSortOrder] = useState(null);

	const tasks = taskStore.tasks;
	const filtered = useMemo(() => {
		let filteredTasks = !select
			? tasks
			: tasks.filter(item => {
					switch (select) {
						case 'Completed':
							return item.sub_task.every(sub_task => sub_task.is_completed);
						case 'in-progress':
							return item.sub_task.some(sub_task => sub_task.is_completed);
						case 'not-started':
							return item.sub_task.every(sub_task => !sub_task.is_completed);
						default:
							return true;
					}
				});
		const sortFnc = (data: TTask[], sort?: string) => {
			console.log(tasks[0].due_date);

			if (sort === 'asc') {
				return [...data].sort(
					(a, b) =>
						Math.ceil((new Date(a.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) -
						Math.ceil((new Date(b.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
				);
			} else {
				return [...data].sort(
					(a, b) =>
						Math.ceil((new Date(b.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) -
						Math.ceil((new Date(a.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
				);
			}
		};
		if (sortOrder === 'Desc') {
			filteredTasks = sortFnc(filteredTasks);
		} else if (sortOrder === 'Asc') {
			filteredTasks = sortFnc(filteredTasks, 'asc');
		}
		return filteredTasks;
	}, [select, sortOrder, tasks]);

	const count = filtered.length;
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
					filtered.map(task => <Task key={task.id} task={task} />)
				) : (
					<div>No tasks found.</div>
				)}
			</div>
		</div>
	);
});
