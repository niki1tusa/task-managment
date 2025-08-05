import type { Metadata } from 'next';

import { DashboardPageClient } from '../dashboardClient';

import { fetchChartPoint } from '@/services/statistics/chart-point-server.service';
import { fetchProjectStat } from '@/services/statistics/project-stat-server.service';
import { getServerAllTask, getServerTodayTasks } from '@/services/tasks/task-server.service';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default async function DashboardPage() {
	const [tasks, todayTasks, projectStats, chartPoints] = await Promise.all([
		getServerAllTask(),
		getServerTodayTasks(),
		fetchProjectStat(),
		fetchChartPoint('yearly'),
	]);
	return (
		<DashboardPageClient
			tasks={tasks.data || []}
			todayTasks={todayTasks.data || []}
			projectStats={projectStats.data || []}
			chartPoints={chartPoints.data || []}
		/>
	);
}
