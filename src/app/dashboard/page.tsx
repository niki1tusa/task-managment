import type { Metadata } from 'next';

import { DashboardPageClient } from '../dashboardClient';

import { getServerAllTask, getServerTodayTasks } from '@/services/tasks/task-server-actions';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	const [tasks, todayTasks] = await Promise.all([
		await getServerAllTask(),
		await getServerTodayTasks(),
	]);
console.log('todayTasks:', todayTasks.data)
	return <DashboardPageClient tasks={tasks.data || []} todayTasks={todayTasks.data || []} />;
}
