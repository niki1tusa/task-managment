import clsx from 'clsx';

import type { TTask } from '@/shared/types/task.types';

import { observer } from 'mobx-react-lite';

import { Footer } from './Footer';
import { StatusBar } from './StatusBar';
import { Avatar } from './header/Avatar';
import { Header } from './header/Header';
import { taskStore } from '@/store/task.store';

interface Props {
	task: TTask;
	className?: string;
	isMinimal?: boolean;
}
export const Task = observer(({ task, className, isMinimal }: Props) => {
	const status= taskStore.statusCount(task) || 0
	
	return (
		<div
			className={clsx(
				'2xl:text-md grid grid-cols-1 gap-3 rounded-3xl border border-white text-sm shadow shadow-neutral-400 dark:border-none',
				className ? `${className} grid-rows-2 text-white` : 'bg-background grid-rows-3'
			)}
		>
			{/* 1 section */}
			<Header task={task} isMinimal={isMinimal} />
			{/* 2 section */}
			{!isMinimal && <StatusBar status={status} />}
			{/* 3 section */}
			{isMinimal ? (
				<div className='mx-5 flex -space-x-2'>
					{/* {task.users.map((user, i) => {
						if (i < 3) {
							return <Avatar key={user.id} id={user.id} img={user.img} />;
						}
						return;
					})} */}
					users
				</div>
			) : (
				<Footer task={task} />
			)}
		</div>
	);
})
