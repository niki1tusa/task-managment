'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar } from '@/components/ui/Avatar';

import type { TTask } from '@/shared/types/task/task.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import { useFormatDateForTask } from '@/hooks/useFormatDateForTask';
import { format } from 'date-fns';



function TimelineTask({ task }: { task: TTask }) {
	const router = useRouter();

	const { TaskIcon, start, end } = useFormatDateForTask(task);
	return (
		<div className='relative' onClick={() => router.push(DASHBOARD_PAGES.TASK(task.id))}>
			<Link
				href={DASHBOARD_PAGES.TASK(task.id)}
				className='pointer-events-none absolute inset-0 z-10'
				aria-hidden='true'
				tabIndex={-1}
			/>
			<div className='bg-timeline-task 2xl:text-md xl:[290px] transition-color grid max-h-[144px] grid-cols-1 grid-rows-2 gap-3 rounded-3xl border border-white text-sm text-white shadow shadow-neutral-400 xl:h-[241px] dark:border-none'>
				{/* 1 section */}
				<div className='mx-5 mt-3 flex gap-3 pt-2'>
					<div className='flex h-9 min-w-9 items-center justify-center rounded-full bg-white/90 shadow shadow-white'>
						<TaskIcon color='#725cee' />
					</div>
					<div className='m grid grid-rows-2'>
						<span className='mb-1 flex items-center leading-none font-medium break-words'>
							{task.title}
						</span>
						<span className='mt-1 text-white'>
							<>
								{format(start!, 'ha').toLowerCase()} - {format(end!, 'ha').toLowerCase()}
							</>
						</span>
					</div>
				</div>
				{/* 2 section */}
				<div className='mx-5 mt-2 flex -space-x-2'>
					{task.task_participants
						.filter(u => Boolean(u.profile))
						.map((profile, i) => (
							<Avatar key={`${profile.profile_id}-${i}`} img={profile.profile.avatar_path || ''} />
						))}
				</div>
			</div>
		</div>
	);
}
export default TimelineTask;
