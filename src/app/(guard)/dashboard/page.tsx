import type { Metadata } from 'next';

import { DashboardClient } from '@/pages/DashboardClient';

import { getServerTodayTasks } from '@/entities/task/api/task-server-service';
import { fetchChartPoint } from '@/features/statistic/api/chart-point-server-service';
import { fetchProjectStat } from '@/features/statistic/api/project-stat-server-service';

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
