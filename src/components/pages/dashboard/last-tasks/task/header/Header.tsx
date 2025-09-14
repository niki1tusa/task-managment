'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { Avatar } from '@/components/ui/Avatar';

import type { TTask } from '@/shared/types/task/task.types';

import { useFormatDateForTask } from '@/hooks/useFormatDateForTask';
import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

export const Header = ({ task }: { task: TTask }) => {
	const { TaskIcon, displayDue } = useFormatDateForTask(task);
	const pathname = usePathname();
	const isTeamPage = pathname === DASHBOARD_PAGES.TEAM;
	return (
		<div className={clsx('mx-5 flex justify-between gap-3 py-5')}>
			<div className='flex gap-3'>
				<div className='flex h-9 min-w-9 items-center justify-center rounded-full shadow shadow-neutral-400'>
					<TaskIcon color='#725cee' />
				</div>
				<div className={clsx(isTeamPage ? 'flex items-center ' :'grid grid-rows-2' )}>
					<span className='mb-1 flex items-center leading-none font-medium break-words'>
						{task.title}
					</span>
					{!isTeamPage && <time className='text-gray mt-1'>{displayDue}</time>}
				</div>
			</div>

			<div className='flex -space-x-2'>
				{task.task_participants
					.filter(u => Boolean(u.profile))
					.slice(0, 3)
					.map((user, i) => (
						<Avatar key={`${user.profile_id}-${i}`} img={user.profile.avatar_path} isHoverResolution={true} />
					))}
			</div>
		</div>
	);
};
