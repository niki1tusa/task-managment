'use client';

import clsx from 'clsx';
import { getHours, getMinutes } from 'date-fns';
import { useMemo } from 'react';

import { Title } from '@/components/ui/Title';

import type { ITask } from '@/shared/types/task.types';

import { useTaskStore } from '@/store/task.store';

import { Task } from '../last-tasks/task/Task';
import { Avatar } from '../last-tasks/task/header/Avatar';

const HOURS = Array.from({ length: 9 }, (_, i) => i + 9);
export default function TodayTasks() {
	const getTodayTasks = useTaskStore(state => state.getTodayTasks);
	const todayTasks = useMemo(() => getTodayTasks(), [getTodayTasks]);
	const users = [...new Set(todayTasks.map((task: ITask) => task.users).flat())];

	// Фильтруем задачи, у которых есть startTime и endTime
	const tasksWithTime = todayTasks.filter(task => task.due.startTime && task.due.endTime);

	return (
		<div className='text-foreground my-10 h-[600px] rounded-2xl border border-white px-5 pt-5 shadow shadow-neutral-500 dark:border-none'>
			<div className='flex justify-between pb-5'>
				<Title>Today Tasks</Title>
				<div className='flex -space-x-2'>
					{users.map(profile => (
						<Avatar key={profile.id} id={profile.id} img={profile.img} />
					))}
				</div>
			</div>
			{/* // часовые метки */}
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
					{/* // вертикальные линии */}
					{HOURS.map((_, i) => (
						<div
							key={i}
							className='absolute top-0 h-full border-l border-gray-300'
							style={{ left: `${(i / HOURS.length) * 100}%` }}
						></div>
					))}
					{/* // сегодняшние задачи */}
					{tasksWithTime.map(task => {
						const start = getHours(task.due.startTime!);
						const end = getHours(task.due.endTime!);
						const startMinutes = getMinutes(task.due.startTime!);
						const endMinutes = getMinutes(task.due.endTime!);
						const startProcent = (((start - 9) * 60 + startMinutes) / ((17 - 9) * 60)) * 100;
						const endProcent = (((end - 9) * 60 + endMinutes) / ((17 - 9) * 60)) * 100;
						const widthProcent = endProcent - startProcent;
						console.log('startprocent:', startProcent);
						console.log('width', widthProcent);
						return (
							<div
								key={task.id}
								className='absolute top-8'
								style={{
									left: `${startProcent}%`,
									width: `${widthProcent}%`,
								}}
							>
								<Task task={task} className='bg-timeline-task' isMinimal={true} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
