'use client';

import dynamic from 'next/dynamic';

import { Header } from '@/components/dashboard/header/Header';
import { LastTasks } from '@/components/dashboard/last-tasks/LastTasks';
import { Statistic } from '@/components/dashboard/statistic/Statistic';
import { useEffect } from 'react';
import { TodayTasks } from '@/components/dashboard/today-tasks/TodayTasks';
import { taskStore } from '@/store/task.store';
import type { Database } from '@/shared/types/db.types';
import type { TTask } from '@/shared/types/task.types';


export default function DashboardPageClient({tasks}:{tasks: TTask[]}) {
	useEffect(()=>{
		taskStore.loadStoreFromServer(tasks)
	},[])
	return (
		<div className='mx-7 mt-2 flex flex-col gap-y-8'>
			<Header />
			<Statistic />
			<LastTasks />
			<TodayTasks />
		</div>
	);
}
