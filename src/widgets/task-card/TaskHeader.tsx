'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { GUARD_PAGES } from '@/shared/config/guard-page-config';
import { displayDueFnc } from '@/shared/lib/displayDue';
import { getTaskIcon } from '@/shared/lib/getTaskIcon';
import type { Task } from '@/shared/model/task-types';
import { Avatar } from '@/shared/ui/Avatar';

export const TaskHeader = ({ task }: { task: Task }) => {
	const displayDue = displayDueFnc(task);
	const TaskIcon = getTaskIcon(task);
	const pathname = usePathname();
	const isTeamPage = pathname === GUARD_PAGES.TEAM;
	return (
		<div className={clsx('mx-5 flex justify-between gap-3 py-5')}>
			<div className='flex gap-3'>
				<div className='shadow-default flex h-9 min-w-9 items-center justify-center rounded-full'>
					<TaskIcon color='#725cee' />
				</div>
				<div className={clsx(isTeamPage ? 'flex items-center' : 'grid grid-rows-2')}>
					<span className='mb-1 flex items-center leading-none font-medium wrap-break-word'>
						{task.title}
					</span>
					{!isTeamPage && <time className='text-gray mt-1'>{displayDue}</time>}
				</div>
			</div>

			<div className='flex -space-x-2'>
				{task.task_participants.length > 3 ? (
					<>
						{task.task_participants
							.filter(u => Boolean(u.profile))
							.slice(0, 2)
							.map((user, i) => {
								return (
									<Avatar
										key={`${user.profile_id}-${i}`}
										img={user.profile.avatar_path}
										isHoverResolution={true}
									/>
								);
							})}
						<div className='shadow-default bg-side flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border'>
							+{task.task_participants.length - 2}
						</div>
					</>
				) : (
					task.task_participants
						.filter(u => Boolean(u.profile))
						.map((user, i) => {
							return (
								<Avatar
									key={`${user.profile_id}-${i}`}
									img={user.profile.avatar_path}
									isHoverResolution={true}
								/>
							);
						})
				)}
			</div>
		</div>
	);
};
