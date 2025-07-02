'use client';

import { useMemo, useState } from 'react';

import { TASKS } from '@/shared/data/task.data';

import FilterTask from './FilterTask';
import { Task } from './task/Task';

export const LastTasks = () => {
	const [select, setSelect] = useState(null);
	const [sortOrder, setSortOrder] = useState(null);
	const filtered = useMemo(() => {
		let filteredTasks = !select
			? TASKS
			: TASKS.filter(item => {
					switch (select) {
						case 'Completed':
							return item.isCompleted;
						case 'in-progress':
							return item.subTask.some(subtask => subtask.isCompleted) && !item.isCompleted;
						case 'not-started':
							return item.subTask.every(subtask => !subtask.isCompleted);
						default:
							return true;
					}
				});

		if (sortOrder === 'Desc') {
			filteredTasks = [...filteredTasks].sort((a, b) => b.due - a.due);
		} else if (sortOrder === 'Asc') {
			filteredTasks = [...filteredTasks].sort((a, b) => a.due - b.due);
		}
		return filteredTasks;
	}, [select, sortOrder]);

	const count = filtered.length;
	return (
		<div className='mt-5'>
			<div className='mt-10 flex justify-between'>
				<h1 className='mb-3 text-[22px] font-medium'>
					Last Tasks <span className='opacity-50'>({count})</span>
				</h1>
				<FilterTask
					select={select}
					setSelect={setSelect}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
				/>
			</div>

			<div className='grid grid-cols-3 gap-2'>
				{count ? (
					filtered.map(task => <Task key={task.id} task={task} />)
				) : (
					<div>No tasks found.</div>
				)}
			</div>
		</div>
	);
};
