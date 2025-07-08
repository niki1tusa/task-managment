import type { Metadata } from 'next';

import { Header } from '@/components/dashboard/header/Header';
import { LastTasks } from '@/components/dashboard/last-tasks/LastTasks';
import { Statistic } from '@/components/dashboard/statistic/Statistic';
import { TodayTasks } from '@/components/dashboard/today-tasks/TodayTasks';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function DashboardPage() {
	return (
		<div className='mx-7 mt-2 flex flex-col gap-y-8'>
			<Header />
			<Statistic />
			<LastTasks />
			<TodayTasks/>
		</div>
	);
}
