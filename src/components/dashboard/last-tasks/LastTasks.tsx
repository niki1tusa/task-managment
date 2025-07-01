'use client';

import { useState } from 'react';

import { TASKS } from '@/shared/data/task.data';

import { Task } from './task/Task';

export const LastTasks = () => {
	const [select, setSelect] = useState('All');
	const OPTIONS = ['All', 'Completed', 'Due'];
	const filteredTasks = TASKS.filter(item => {
		if (select === 'Completed') return item.isCompleted;
		if (select === 'Due') return item.due > 0;
		return item;
	});
	const count = filteredTasks.length;
	return (
		<div className='mt-5'>
			<div className='mt-10 flex justify-between'>
				<h1 className='mb-3 text-[22px] font-medium'>
					Last Tasks <span className='opacity-50'>({count})</span>
				</h1>
				<div className='mb-4 flex gap-2 rounded-[4px] border border-white py-1 pl-2 shadow shadow-neutral-400'>
					{OPTIONS.map(button => (
						<button
							onClick={() => setSelect(button)}
							key={button}
							value={button}
							className={`rounded-sm px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
								select === button
									? 'text-primary bg-white shadow'
									: 'hover:text-primary text-gray-500'
							}`}
						>
							{button}
						</button>
					))}
				</div>
			</div>

			<div className='grid grid-cols-3 gap-2'>
				{count ? (
					filteredTasks.map(task => <Task key={task.id} task={task} />)
				) : (
					<div>No tasks found.</div>
				)}
			</div>
		</div>
	);
};
