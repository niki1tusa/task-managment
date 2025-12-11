'use client';

import { useState } from 'react';

import type { TByAscOrDesc, TStatus } from '@/shared/model/task-types';
import Skeleton from '@/shared/ui/Skeleton';
import { Title } from '@/shared/ui/Title';

import BtnCreateTask from './BtnCreateTask';
import FiltersForTask from './FiltersForTask';
import { useMyTasks } from '@/entities/task/use-my-tasks';
import { Task } from '@/widgets/task-card/Task';

export const ListTasks = () => {
	// state
	const [select, setSelect] = useState<TStatus>('All');
	const [sortOrder, setSortOrder] = useState<TByAscOrDesc>('Asc');
	// custom state
	const { tasks, isPending } = useMyTasks({ select, sortOrder });

	if (!tasks) return null;
	return (
		<div className='flex flex-col gap-5'>
			<Title count={tasks.length}> Last Tasks </Title>
			<div className='flex justify-between'>
				<BtnCreateTask />
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
