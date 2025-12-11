'use client';

import { Header } from '@/widgets/header/Header';

import type { TGetTodayTasksResponse } from '@/shared/model/task-types';

import { Statistic } from '@/features/statistic/Statistic';
import type {
	TGetChartPointResponse,
	TGetProjectStatResponse,
} from '@/features/statistic/statistics-types';
import { ListTasks } from '@/widgets/list-tasks/ListTasks';
import Timeline from '@/widgets/timeline/ui/Timeline';

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
			<ListTasks />
			<Timeline todayTasks={todayTasks} />
		</div>
	);
};
