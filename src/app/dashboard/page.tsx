import type { Metadata } from 'next';

import { DashboardPageClient } from '../dashboardClient';

import { getAllTask } from '@/services/tasks/task-server-actions';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	const tasks = await getAllTask();
	console.log(tasks);
	if (tasks.error) {
		return <div>Failed to load tasks</div>;
	}
	return <DashboardPageClient tasks={tasks.data} />;
}
