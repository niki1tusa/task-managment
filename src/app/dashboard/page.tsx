import type { Metadata } from 'next';

import DashboardPageClient from '../dashboardClient';
import { taskServiceGetAll } from '@/services/tasks/task.service';


export const metadata: Metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	
	const tasks = await taskServiceGetAll()


	return <DashboardPageClient tasks={tasks}/>;
}
