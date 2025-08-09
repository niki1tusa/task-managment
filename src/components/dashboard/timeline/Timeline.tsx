'use client';

import clsx from 'clsx';

import { Title } from '@/components/ui/Title';

import type { TTask } from '@/shared/types/task/task.types';

import { Avatar } from '../../ui/Avatar';
import { Task } from '../last-tasks/task/Task';
import TimelineTask from './TimelineTask';

const HOURS = Array.from({ length: 9 }, (_, i) => i + 9);
// helpers
const WINDOW_START_MIN = 9 * 60; // 09:00
const WINDOW_END_MIN = 17 * 60; // 17:00
const WINDOW_SPAN_MIN = WINDOW_END_MIN - WINDOW_START_MIN; // 480

function timeStrToMinutes(t: string) {
	const [h, m, s] = t.split(':').map(Number);
	return h * 60 + m + (s ? Math.floor(s / 60) : 0);
}

export const Timeline = ({ todayTasks }: { todayTasks: TTask[] }) => {
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

						const startMin = timeStrToMinutes(task.start_time);
						const endMin = timeStrToMinutes(task.end_time);

						const clampedStart = Math.max(WINDOW_START_MIN, Math.min(startMin, WINDOW_END_MIN));
						const clampedEnd = Math.max(WINDOW_START_MIN, Math.min(endMin, WINDOW_END_MIN));

						const startPct = ((clampedStart - WINDOW_START_MIN) / WINDOW_SPAN_MIN) * 100;
						const endPct = ((clampedEnd - WINDOW_START_MIN) / WINDOW_SPAN_MIN) * 100;
						const widthPct = Math.max(0, endPct - startPct);
						return (
							<div
								key={task.id}
								className='absolute top-8'
								style={{
									left: `${startPct}%`,
									width: `${widthPct}%`,
								}}
							>
								<TimelineTask task={task}  />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
