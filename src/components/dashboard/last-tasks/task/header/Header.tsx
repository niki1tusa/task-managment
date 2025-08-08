import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import React from 'react';

import type { TSubTaskRow, TTask } from '@/shared/types/task/task.types';

import { type IconName, MODAL_ICON } from '../../../../../shared/data/icon.data';
import { Avatar } from '../../../../ui/Avatar';

interface Props {
	task: TTask;
	isMinimal?: boolean;
}
//TODO: завтрашний день считается - today
export const Header = ({ task, isMinimal }: Props) => {
	const TaskIcon = MODAL_ICON[task.icon as IconName];
	const date = Math.ceil((new Date(task.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
	const start = task.start_time ? parseISO(`${task.due_date}T${task.start_time}`) : null;
	const end = task.end_time ? parseISO(`${task.due_date}T${task.end_time}`) : null;

	const displayDue =
		date === 0
			? 'Today'
			: date < 0
				? task.sub_task.every((subTask: TSubTaskRow) => subTask.is_completed)
					? 'Done'
					: 'Overdue'
				: ` ${date} days`;
	return (
		<div className='mx-5 mt-3 flex gap-3 pt-2'>
			<div
				className={clsx(
					'flex h-9 min-w-9 items-center justify-center rounded-full shadow shadow-neutral-400',
					isMinimal ? 'bg-white/90 shadow-white' : 'shadow-neutral-400'
				)}
			>
				<TaskIcon color='#725cee' />
			</div>
			<div className='m grid grid-rows-2'>
				<span className='mb-1 flex items-center leading-none font-medium break-words'>
					{task.title}
				</span>
				<span className={clsx('mt-1', isMinimal ? 'text-white' : 'text-gray')}>
					{isMinimal ? (
						<>
							{format(start!, 'ha').toLowerCase()}- {format(end!, 'ha').toLowerCase()}
						</>
					) : (
						displayDue
					)}
				</span>
			</div>
			{!isMinimal && (
				<div className='flex -space-x-2'>
					{task.task_participants
						.filter(u => Boolean(u.profile))
						.map((user, i) => {
							if (i < 3) {
								return (
									<Avatar key={`${user.profile_id}-${i}`} img={user.profile.avatar_path || ''} />
								);
							}
							return;
						})}
				</div>
			)}
		</div>
	);
};
