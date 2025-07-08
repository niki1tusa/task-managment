import { Plane } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import type { ITask } from '@/shared/types/task.types';

import { type IconName, MODAL_ICON } from '../../../modals/icon.data';
import { Avatar } from './Avatar';

export const Header = ({ task }: { task: ITask }) => {
	const TaskIcon = MODAL_ICON[task.iconTheme.trim() as IconName];
	const date = Math.ceil((task.due.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
	const result = date <= 0 ? (task.isCompleted ? 'Done' : 'Overdue') : ` ${date} days`;
	return (
		<div className='mx-5 mt-3 flex gap-3 pt-2'>
			<div className='flex h-9 w-9 items-center justify-center rounded-full shadow shadow-neutral-400'>
				<TaskIcon color='#725cee' />
			</div>
			<div className='flex min-w-0 flex-1 flex-col'>
				<span className='mb-1 line-clamp-2 text-sm leading-none font-medium break-words'>
					{task.title}
				</span>
				<span className='text-gray'>{result}</span>
			</div>
			<div className='flex -space-x-2'>
				{task.users.map(user => (
					<Avatar key={user.id} id={user.id} img={user.img} />
				))}
			</div>
		</div>
	);
};

