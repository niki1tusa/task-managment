'use client';

import { getHours, getMinutes } from 'date-fns';
import { useMemo } from 'react';

import { Title } from '@/components/ui/Title';

import type { ITask } from '@/shared/types/task.types';

import { useTaskStore } from '@/store/store';

import { Avatar } from '../last-tasks/task/header/Avatar';
import { ICON_NAMES } from '../modals/icon.data';

import TimelineChart from './TimeLineChart';
import { Task } from '../last-tasks/task/Task';

const HOURS = Array.from({ length: 9 }, (_, i) => i + 1);
export function TodayTasks() {
	const getTodayTasks = useTaskStore(state => state.getTodayTasks);
	const todayTasks = useMemo(() => getTodayTasks(), [getTodayTasks]);
	const users = [...new Set(todayTasks.map((task: ITask) => task.users).flat())];
	return (
		<div className='text-foreground rounded-2xl border border-white px-5 pt-5 shadow shadow-neutral-500 dark:border-none'>
			<div className='flex justify-between pb-5'>
				<Title>Today Tasks</Title>
				<div className='flex -space-x-2'>
					{users.map(profile => (
						<Avatar key={profile.id} id={profile.id} img={profile.img} />
					))}
				</div>
			</div>
			<div className='overflow-x-autop-3 w-full'>
				<div className='grid grid-cols-9'>
					{HOURS.map(hour => (
						<div key={hour} className='text-center text-sm'>
							{hour > 12 ? ` ${hour} pm` : `${hour} am`}
						</div>
					))}
				</div>
				<div className='relative h-36'>
					{todayTasks.map(task => {
						const start = getHours(task.due.startTime);
						const end = getHours(task.due.endTime);
						const startMinutes = getMinutes(task.due.startTime);
						const endMinutes = getMinutes(task.due.endTime);
						const startProcent = ((start - 9) * 60 + (startMinutes / (17 - 9)) * 60) * 100;
						const endProcent = ((start - 9) * 60 + (endMinutes / (17 - 9)) * 60) * 100;
						const widthProcent = endProcent - startProcent;
						const Icon = ICON_NAMES[task.iconTheme];

						return <div key={task.id} className='absolute top-3 ' style={{
							left: `${startProcent}%`,
							width: `${widthProcent}`
						}}><Task task={task}/></div>;
					})}
				</div>
			</div>
			<TimelineChart />
		</div>
	);
}
