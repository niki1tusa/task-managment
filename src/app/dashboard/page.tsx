import type { Metadata } from 'next';

import { DashboardClient } from '../../components/pages/dashboard/DashboardClient';

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
		<DashboardClient
			tasks={tasks.data || []}
			todayTasks={todayTasks.data || []}
			projectStats={projectStats.data || []}
			chartPoints={chartPoints.data || []}
		/>
	);
}
