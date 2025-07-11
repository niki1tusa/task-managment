import clsx from 'clsx';

import type { ITask } from '@/shared/types/task.types';

import { useTaskStore } from '@/store/store';

import { Footer } from './Footer';
import { StatusBar } from './StatusBar';
import { Avatar } from './header/Avatar';
import { Header } from './header/Header';

interface Props {
	task: ITask;
	className: string;
	isMinimal?: boolean;
}
export const Task = ({ task, className, isMinimal }: Props) => {
	const statusCount = useTaskStore(state => state.statusCount);
	const status = statusCount(task);
	return (
		<div
			className={clsx(
				'grid grid-cols-1 gap-3 rounded-3xl border border-white text-md shadow shadow-neutral-400 dark:border-none',
				className ? `${className} text-white grid-rows-2` : 'bg-background grid-rows-3'
			)}
		>
			{/* 1 section */}
			<Header task={task} isMinimal={isMinimal} />
			{/* 2 section */}
			{!isMinimal && <StatusBar status={status} />}
			{/* 3 section */}
			{isMinimal ? (
				<div className='flex -space-x-2 mx-5'>
					{task.users.map((user, i) => {
						if (i < 3) {
							return <Avatar key={user.id} id={user.id} img={user.img} />;
						}
						return;
					})}
				</div>
			) : (
				<Footer task={task} />
			)}
		</div>
	);
};
