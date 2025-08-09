'use client';

import clsx from 'clsx';
import { memo } from 'react';

import { Title } from '@/components/ui/Title';

import type { TTask } from '@/shared/types/task/task.types';

import { Avatar } from '../../ui/Avatar';

import TimelineTask from './TimelineTask';
import { timelineTaskPercent } from './timelineTaskPercent';

const HOURS = Array.from({ length: 9 }, (_, i) => i + 9);

function Timeline({ todayTasks }: { todayTasks: TTask[] }) {
	const profiles = [
		...new Map(
			todayTasks
				.flatMap(task => task.task_participants)
				.filter(u => Boolean(u.profile))
				.map(p => [p.profile.id, p.profile])
		).values(),
	];

	return (
		<div className='text-foreground my-10 h-[600px] rounded-2xl border border-white px-5 pt-5 shadow shadow-neutral-500 dark:border-none'>
			<div className='flex justify-between pb-5'>
				<Title>Today Tasks</Title>
				<div className='flex -space-x-2'>
					{profiles.map((p, i) => (
						<Avatar key={`${p.id}-${i}`} img={p.avatar_path || ''} />
					))}
				</div>
			</div>
			<div className='w-full overflow-x-auto p-3'>
				<div className='grid grid-cols-9 grid-rows-2'>
					{HOURS.map(hour => (
						<div
							key={hour}
							className={clsx('text-center text-sm', { 'text-primary': Date.now() === hour })}
						>
							{hour > 12 ? ` ${hour} pm` : `${hour} am`}
						</div>
					))}
				</div>
				<div className='relative h-72'>
					{HOURS.map((_, i) => (
						<div
							key={i}
							className='absolute top-0 h-full border-l border-gray-300'
							style={{ left: `${(i / HOURS.length) * 100}%` }}
						></div>
					))}
					{todayTasks.map(task => {
						if (!task.start_time || !task.end_time) return null;
						const pct = timelineTaskPercent(task);

						return (
							<div
								key={task.id}
								className='absolute top-8'
								style={{
									left: `${pct.startPct}%`,
									width: `${pct.widthPct}%`,
								}}
							>
								<TimelineTask task={task} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
export default memo(Timeline);
