import clsx from 'clsx';

import type { TSubTaskRow, TTask } from '@/shared/types/task/task.types';

import { Avatar } from '../../../ui/Avatar';

import { Footer } from './Footer';
import { StatusBar } from './StatusBar';
import { Header } from './header/Header';

interface Props {
	task: TTask;
	className?: string;
	isMinimal?: boolean;
}
export const Task = ({ task, className, isMinimal }: Props) => {
	const status = (data: any) => {
		return Math.floor(
			(data.sub_task.filter((item: TSubTaskRow) => item.is_completed === true).length /
				data.sub_task.length) *
				100
		);
	};

	return (
		<div
			className={clsx(
				'2xl:text-md grid grid-cols-1 gap-3 rounded-3xl border border-white text-sm shadow shadow-neutral-400 transition-all  hover:scale-105 dark:border-none',
				className ? `${className} grid-rows-2 text-white` : 'bg-background grid-rows-3',
				{ 'max-h-[144px]': isMinimal }
			)}
		>
			{/* 1 section */}
			<Header task={task} isMinimal={isMinimal} />
			{/* 2 section */}
			{!isMinimal && <StatusBar status={status(task)} />}
			{/* 3 section */}
			{isMinimal ? (
				<div className='mx-5 mt-2 flex -space-x-2'>
					{task.task_participants
						.filter(u => Boolean(u.profile))
						.map((profile, i) => (
							<Avatar key={`${profile.profile_id}-${i}`} img={profile.profile.avatar_path || ''} />
						))}
				</div>
			) : (
				<Footer task={task} />
			)}
		</div>
	);
};
