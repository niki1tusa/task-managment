import type { Metadata } from 'next';

import { DashboardClient } from '@/components/pages/dashboard/DashboardClient';

import { fetchChartPoint } from '@/services/statistics/chart-point-server-service';
import { fetchProjectStat } from '@/services/statistics/project-stat-server-service';
import { getServerTodayTasks } from '@/services/tasks/task-server-service';

export const metadata: Metadata = {
	title: 'Dashboard',
	description:
		'View your daily tasks and create/update/delete task, productivity insights, and project analytics in one centralized dashboard. Task Hub helps you stay organized, track progress, and make data-driven decisions.',
	openGraph: {
		title: 'Task Hub Dashboard',
		description:
			'Monitor your projects, analyze performance, and stay productive with Task Hub — your all-in-one workspace for smart task management.',
		url: 'https://your-domain.vercel.app/dashboard',
		siteName: 'Task Hub',
		type: 'website',
	},
};

export default async function DashboardPage() {
	const [todayTasks, projectStats, chartPoints] = await Promise.all([
		getServerTodayTasks(),
		fetchProjectStat(),
		fetchChartPoint('yearly'),
	]);
	return (
		<DashboardClient
			todayTasks={todayTasks.data || []}
			projectStats={projectStats.data || []}
			chartPoints={chartPoints.data || []}
		/>
	);
}
