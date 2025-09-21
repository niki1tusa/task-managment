import { useQuery } from '@tanstack/react-query';


import {  getClientAllTaskWithoutSorting } from '@/services/tasks/task-client.service';
import type { TTask } from '@/shared/types/task/task.types';

export function useAllTaskWithoutFilter() {
	const {
		data: tasks,
		isPending,
		isFetching,
	} = useQuery<TTask[], Error>({
		queryKey: ['tasks'],
		queryFn: () => getClientAllTaskWithoutSorting(),
		placeholderData: prev => prev,
	});
	return { tasks, isPending, isFetching };
}
