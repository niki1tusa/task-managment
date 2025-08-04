import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { useMemo } from 'react';

import type { TGetTasksResponse, TSubTaskRow, TTask } from '@/shared/types/task.types';

import { type IconName, MODAL_ICON } from '../../../../../shared/data/icon.data';
import { Avatar } from '../../../../ui/Avatar';

interface Props {
	task: TTask;
	isMinimal?: boolean;
}
export const Header = ({ task, isMinimal }: Props) => {
	const TaskIcon = MODAL_ICON[task.icon as IconName];
	const date = Math.ceil((new Date(task.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
	const start = task.start_time ? parseISO(`${task.due_date}T${task.start_time}`) : null;
	const end = task.end_time ? parseISO(`${task.due_date}T${task.end_time}`) : null;

	const displayDue =
		date <= 0
			? task.sub_task.every((subTask: TSubTaskRow) => subTask.is_completed)
				? 'Done'
				: 'Overdue'
			: ` ${date} days`;
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
				<span className='[font-size:clamp(0.75rem,5vw,1rem) mb-1 [max-width:5ch] text-base leading-none font-medium'>
					{task.title}
				</span>
				<span className={clsx(isMinimal ? 'text-white' : 'text-gray')}>
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
							return (
								<Avatar key={`${user.profile_id}-${i}`} img={user.profile.avatar_path || ''} />
							);
						})}
				</div>
			)}
		</div>
	);
};

export function SymbolTitle({ title }: { title: string }) {
	const fontSizeClass = useMemo(() => {
		const len = title.length;
		if (len <= 10) return 'text-xl';
		if (len <= 20) return 'text-lg';
		if (len <= 30) return 'text-base';
		if (len <= 50) return 'text-sm';
		return 'text-xs';
	}, [title]);

	return (
		<span className={`${fontSizeClass} mb-1 leading-none font-medium break-words`}>{title}</span>
	);
}
