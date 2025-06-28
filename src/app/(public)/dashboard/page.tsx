import type { Metadata } from 'next';

import { Header } from '@/components/header/Header';
import { Statistic } from '@/components/statistic/Statistic';
import { Card } from '@/components/statistic/card/Card';
import { cards } from '@/components/statistic/card/card.data';
import { LastTasks } from '@/components/last-tasks/LastTasks';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default function DashboardPage() {
	return (
		<>
			<Header />
			<Statistic />
			<LastTasks/>
		</>
	);
}
