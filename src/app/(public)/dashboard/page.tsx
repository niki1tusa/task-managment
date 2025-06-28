import type { Metadata } from 'next';

import { Header } from '@/components/dashboard/header/Header';
import { LastTasks } from '@/components/dashboard/last-tasks/LastTasks';
import { Statistic } from '@/components/dashboard/statistic/Statistic';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function DashboardPage() {
	return (
		<>
			<Header />
			<Statistic />
			<LastTasks />
		</>
	);
}
