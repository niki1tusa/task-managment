import clsx from 'clsx';
import { observer } from 'mobx-react-lite';

import type { TGetTasksResponse, TTask } from '@/shared/types/task.types';

import { taskStore } from '@/store/task.store';

import { Footer } from './Footer';
import { StatusBar } from './StatusBar';
import { Avatar } from './header/Avatar';
import { Header } from './header/Header';

interface Props {
	task: TTask;
	className?: string;
	isMinimal?: boolean;
}
export const Task = observer(({ task, className, isMinimal }: Props) => {
	const status = taskStore.statusCount(task) || 0;
	console.log('profile:', task.task_participants);
	return (
		<div
			className={clsx(
				'2xl:text-md grid grid-cols-1 gap-3 rounded-3xl border border-white text-sm shadow shadow-neutral-400 dark:border-none',
				className ? `${className} grid-rows-2 text-white` : 'bg-background grid-rows-3',
				{ 'max-h-[144px]': isMinimal }
			)}
		>
			{/* 1 section */}
			<Header task={task} isMinimal={isMinimal} />
			{/* 2 section */}
			{!isMinimal && <StatusBar status={status} />}
			{/* 3 section */}
			{isMinimal ? (
				<div className='mx-5 flex -space-x-2'>
					{task.task_participants
						.filter(u => Boolean(u.profile))
						.map(profile => (
							<Avatar key={profile.profile_id} img={profile.profile.avatar_path || ''} />
						))}
				</div>
			) : (
				<Footer task={task} />
			)}
		</div>
	);
});
