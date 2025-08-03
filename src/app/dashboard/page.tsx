import type { Metadata } from 'next';

import { DashboardPageClient } from '../dashboardClient';

import { getServerAllTask, getServerTodayTasks } from '@/services/tasks/task-server.service';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	const [tasks, todayTasks] = await Promise.all([
		await getServerAllTask(),
		await getServerTodayTasks(),
	]);
	// console.log('task from pageDashboard:', tasks);
	// console.log('todayTasks:', todayTasks.data);
	return <DashboardPageClient tasks={tasks.data || []} todayTasks={todayTasks.data || []} />;
}
