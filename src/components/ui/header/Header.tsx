'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { Avatar } from '@/components/ui/Avatar';

import type { TTask } from '@/shared/types/task.types';

import { GUARD_PAGES } from '@/config/guard-page-config';

import { useFormatDateForTask } from '@/hooks/useFormatDateForTask';

export const Header = ({ task }: { task: TTask }) => {
	const { TaskIcon, displayDue } = useFormatDateForTask(task);
	const pathname = usePathname();
	const isTeamPage = pathname === GUARD_PAGES.TEAM;
	return (
		<div className={clsx('mx-5 flex justify-between gap-3 py-5')}>
			<div className='flex gap-3'>
				<div className='shadow-default flex h-9 min-w-9 items-center justify-center rounded-full'>
					<TaskIcon color='#725cee' />
				</div>
				<div className={clsx(isTeamPage ? 'flex items-center' : 'grid grid-rows-2')}>
					<span className='mb-1 flex items-center leading-none font-medium break-words'>
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
						<div className='shadow-default flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border bg-white'>
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
