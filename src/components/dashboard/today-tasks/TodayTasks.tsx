'use client';

import { Title } from '@/components/ui/Title';

import type { ITask } from '@/shared/types/task.types';

import { useTaskStore } from '@/store/store';

import { Avatar } from '../last-tasks/task/header/Avatar';

import TimelineChart from './TimeLineChart';

const HOURS = Array.from({ length: 9 }, (_, i) => i + 1);
export function TodayTasks() {
	const profiles = useTaskStore(state => state.profiles);
	const todayTasks = useTaskStore(state => state.getTodayTasks);
const users = [...new Set(todayTasks().map((task: ITask) => task.users).flat())];
	return (
		<div className='text-foreground rounded-2xl border border-white px-5 pt-5 shadow shadow-neutral-500 dark:border-none'>
			<div className='flex justify-between pb-5'>
				<Title>Today Tasks</Title>
				<div className='flex -space-x-2'>
					{profiles.map(profile => (
						<Avatar key={profile.id} id={profile.id} img={profile.img} />
					))}
				</div>
			</div>
			<TimelineChart />
		</div>
	);
}
