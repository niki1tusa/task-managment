'use client';

import { Header } from '@/components/dashboard/header/Header';
import { LastTasks } from '@/components/dashboard/last-tasks/LastTasks';
import { Statistic } from '@/components/dashboard/statistic/Statistic';
import { TodayTasks } from '@/components/dashboard/today-tasks/TodayTasks';

import type { TGetTasksResponse, TGetTodayTasksResponse} from '@/shared/types/task.types';

export const DashboardPageClient = ({
	tasks,
	todayTasks,
}: {
	tasks: TGetTasksResponse;
	todayTasks: TGetTodayTasksResponse;
}) => {
	return (
		<div className='mx-12 mt-2 flex flex-col gap-y-8'>
			<Header />
			<Statistic />
			<LastTasks tasks={tasks} />
			<TodayTasks todayTasks={todayTasks} />
		</div>
	);
};
