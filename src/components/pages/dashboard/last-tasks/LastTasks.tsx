'use client';

import { useState } from 'react';

import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';

import type { TByAscOrDesc, TStatus } from '@/shared/types/task.types';

import { useModalStore } from '@/store/modals-store';

import { useMyTasks } from '@/hooks/useMyTasks';

import FiltersForTask from './FiltersForTask';
import { Task } from './task/Task';

export const LastTasks = () => {
	// state
	const [select, setSelect] = useState<TStatus>('All');
	const [sortOrder, setSortOrder] = useState<TByAscOrDesc>('Asc');
	// custom state
	const { open } = useModalStore();
	const { tasks, isPending } = useMyTasks({ select, sortOrder });

	if (!tasks) return null;
	return (
		<div className='flex flex-col gap-5'>
			<Title count={tasks.length}> Last Tasks </Title>
			<div className='flex justify-between'>
				<button
					onClick={() => {
						open('createTask');
					}}
					className='hover:text-primary shadow-default flex max-h-[41px] rounded-sm border border-white px-2 pt-2 text-sm font-medium text-gray-500 transition-all duration-300 dark:hover:text-white'
				>
					+ Add Task
				</button>
				<FiltersForTask
					select={select}
					setSelect={setSelect}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
				/>
			</div>

			<div className='grid grid-cols-1 gap-x-4 gap-y-5 lg:grid-cols-3 2xl:grid-cols-4'>
				{isPending ? (
					<Skeleton length={3} width='w-[300px]' />
				) : tasks.length ? (
					tasks.map(task => <Task key={task.id} task={task} />)
				) : (
					<div>No tasks found.</div>
				)}
			</div>
		</div>
	);
};
