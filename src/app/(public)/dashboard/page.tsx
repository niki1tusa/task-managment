import type { Metadata } from 'next';

import { Header } from '@/components/header/Header';
import { LastTasks } from '@/components/last-tasks/LastTasks';
import { Statistic } from '@/components/statistic/Statistic';

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
