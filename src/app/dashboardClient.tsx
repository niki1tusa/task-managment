'use client';

import { Header } from '@/components/dashboard/header/Header';
import { LastTasks } from '@/components/dashboard/last-tasks/LastTasks';
import DeleteConfirm from '@/components/dashboard/modals/DeleteConfirm';
import { Statistic } from '@/components/dashboard/statistic/Statistic';
import  Timeline from '@/components/dashboard/timeline/Timeline';

import { useConfirmStore } from '@/shared/store/confirm.store';
import type {
	TGetChartPointResponse,
	TGetProjectStatResponse,
} from '@/shared/types/statistics/statistics.types';
import type { TGetTasksResponse, TGetTodayTasksResponse } from '@/shared/types/task/task.types';

export const DashboardPageClient = ({
	tasks,
	todayTasks,
	projectStats,
	chartPoints,
}: {
	tasks: TGetTasksResponse;
	todayTasks: TGetTodayTasksResponse;
	projectStats: TGetProjectStatResponse;
	chartPoints: TGetChartPointResponse;
}) => {
	const { isOpen } = useConfirmStore();
	return (
		<div className='mx-9 mt-2 flex flex-col gap-y-8 2xl:mx-12'>
			<Header />
			<Statistic projectStats={projectStats} chartPoints={chartPoints} />
			{isOpen && <DeleteConfirm />}
			<LastTasks tasks={tasks} />
			<Timeline todayTasks={todayTasks} />
		</div>
	);
};
