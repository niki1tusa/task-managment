'use client';

import { Title } from '@/components/ui/Title';

import { useTaskStore } from '@/store/store';

import { Avatar } from '../last-tasks/task/header/Avatar';
import TimelineChart from './TimeLineChart';

export function TodayTasks() {
	const profiles = useTaskStore(state => state.profiles);
	return (
			<div className='text-foreground rounded-2xl border border-white shadow shadow-neutral-500 dark:border-none px-5 pt-5'>
			<div className='flex justify-between pb-5'>
				<Title>Today Tasks</Title>
				<div className='flex -space-x-2'>
					{profiles.map(profile => (
						<Avatar key={profile.id} id={profile.id} img={profile.img} />
					))}
				</div>
			</div>
            <TimelineChart/>
		</div>
	);
}
