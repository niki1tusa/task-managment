'use client';

import { Header } from '@/components/pages/dashboard/header/Header';
import { LastTasks } from '@/components/pages/dashboard/last-tasks/LastTasks';
import { Statistic } from '@/components/pages/dashboard/statistic/Statistic';
import Timeline from '@/components/pages/dashboard/timeline/Timeline';

import type {
	TGetChartPointResponse,
	TGetProjectStatResponse,
} from '@/shared/types/statistics/statistics.types';
import type { TGetTodayTasksResponse } from '@/shared/types/task/task.types';

export const DashboardClient = ({
	todayTasks,
	projectStats,
	chartPoints,
}: {
	todayTasks: TGetTodayTasksResponse;
	projectStats: TGetProjectStatResponse;
	chartPoints: TGetChartPointResponse;
}) => {
	return (
		<div className='mx-9 mt-2 flex flex-col gap-y-8 2xl:mx-12'>
			<Header />
			<Statistic projectStats={projectStats} chartPoints={chartPoints} />
			<LastTasks />
			<Timeline todayTasks={todayTasks} />
		</div>
	);
};
