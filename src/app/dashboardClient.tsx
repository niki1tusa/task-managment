'use client';

import dynamic from 'next/dynamic';

import { Header } from '@/components/dashboard/header/Header';
import { LastTasks } from '@/components/dashboard/last-tasks/LastTasks';
import { Statistic } from '@/components/dashboard/statistic/Statistic';

const DynamicTodayTasks = dynamic(() => import('@/components/dashboard/today-tasks/TodayTasks'), {
	ssr: false,
});

export default function DashboardPageClient() {
	return (
		<div className='mx-7 mt-2 flex flex-col gap-y-8'>
			<Header />
			<Statistic />
			<LastTasks />
			<DynamicTodayTasks />
		</div>
	);
}
