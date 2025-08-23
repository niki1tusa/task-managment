'use client';

import { Avatar } from '@/components/ui/Avatar';

import type { TTask } from '@/shared/types/task/task.types';

import { useFormatDateForTask } from '@/hooks/useFormatDateForTask';

export const Header = ({ task }: { task: TTask }) => {
	const { TaskIcon, displayDue } = useFormatDateForTask(task);

	return (
		<div className='mx-5 mt-3 flex gap-3 pt-2 justify-between'>
			<div className='flex gap-3'>
				<div className='flex h-9 min-w-9 items-center justify-center rounded-full shadow shadow-neutral-400'>
					<TaskIcon color='#725cee' />
				</div>
				<div className='m grid grid-rows-2'>
					<span className='mb-1 flex items-center leading-none font-medium break-words'>
						{task.title}
					</span>
					<span className='text-gray mt-1'>{displayDue}</span>
				</div>
			</div>

			<div className='flex -space-x-2'>
				{task.task_participants
					.filter(u => Boolean(u.profile))
					.map((user, i) => {
						if (i < 3) {
							return (
								<Avatar
									key={`${user.profile_id}-${i}`}
									img={user.profile.avatar_path}
									isHoverResolution={true}
								/>
							);
						}
						return;
					})}
			</div>
		</div>
	);
};
