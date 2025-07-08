import type { ITask } from '@/shared/types/task.types';

import { useTaskStore } from '@/store/store';

import { Footer } from './Footer';
import { StatusBar } from './StatusBar';
import { Header } from './header/Header';

export const Task = ({ task }: { task: ITask }) => {
	const statusCount = useTaskStore(state => state.statusCount);
	const status = statusCount(task);
	return (
		<div className='bg-background grid grid-cols-1 grid-rows-3 gap-3 rounded-3xl border border-white text-sm shadow shadow-neutral-400 dark:border-none'>
			{/* 1 section */}
			<Header task={task} />
			{/* 2 section */}
			<StatusBar status={status} />
			{/* 3 section */}
			<Footer task={task} />
		</div>
	);
};
