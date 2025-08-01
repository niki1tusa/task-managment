'use client';

import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { Header } from '@/components/dashboard/header/Header';
import { LastTasks } from '@/components/dashboard/last-tasks/LastTasks';
import { Statistic } from '@/components/dashboard/statistic/Statistic';
import { TodayTasks } from '@/components/dashboard/today-tasks/TodayTasks';

import type { TGetTasksResponse, TGetTodayTasksResponse, TTask } from '@/shared/types/task.types';

import { taskStore } from '@/store/task.store';

export const DashboardPageClient = observer(({ tasks, todayTasks }: { tasks: TGetTasksResponse, todayTasks: TGetTodayTasksResponse }) => {
	useEffect(() => {
		taskStore.loadStoreFromServer(tasks);
	}, []);
	return (
		<div className='mx-12 mt-2 flex flex-col gap-y-8'>
			<Header />
			<Statistic />
			<LastTasks tasks={tasks}/>
			<TodayTasks todayTasks={todayTasks}/>
		</div>
	);
});
