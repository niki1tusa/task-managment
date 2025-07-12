import clsx from 'clsx';
import { format } from 'date-fns';
import React from 'react';

import type { ITask } from '@/shared/types/task.types';

import { type IconName, MODAL_ICON } from '../../../modals/icon.data';

import { Avatar } from './Avatar';

export const Header = ({ task, isMinimal }: { task: ITask; isMinimal?: boolean }) => {
	const TaskIcon = MODAL_ICON[task.iconTheme.trim() as IconName];
	const date = Math.ceil((task.due.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
	const displayDue = date <= 0 ? (task.isCompleted ? 'Done' : 'Overdue') : ` ${date} days`;
	return (
		<div className='mx-5 mt-3 flex gap-3 pt-2'>
			<div
				className={clsx(
					'flex h-9 w-9 items-center justify-center rounded-full shadow shadow-neutral-400',
					isMinimal ? 'bg-white/90 shadow-white' : 'shadow-neutral-400'
				)}
			>
				<TaskIcon color='#725cee' />
			</div>
			<div className='flex min-w-0 flex-1 flex-col'>
				<span className='mb-1 line-clamp-2 text-lg 2xl:text-xl leading-none font-medium break-words'>
					{task.title}
				</span>
				<span className={clsx(isMinimal ? 'text-white' : 'text-gray')}>
					{isMinimal ? (
						<>
							{format(task.due.startTime!, 'ha').toLowerCase()}- {format(task.due.endTime!, 'ha').toLowerCase()}
						</>
					) : (
						displayDue
					)}
				</span>
			</div>
			{!isMinimal && (
				<div className='flex -space-x-2'>
					{task.users.map((user, i) => {
						if (i < 3) {
							return <Avatar key={user.id} id={user.id} img={user.img} />;
						}
						return;
					})}
				</div>
			)}
		</div>
	);
};
