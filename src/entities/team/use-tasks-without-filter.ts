import { useQuery } from '@tanstack/react-query';

import type { Task } from '@/shared/model/task-types';

import { getClientAllTaskWithoutSorting } from '@/entities/task/api/task-client-service';

export function useAllTaskWithoutFilter() {
	const {
		data: tasks,
		isPending,
		isFetching,
	} = useQuery<Task[], Error>({
		queryKey: ['tasks'],
		queryFn: () => getClientAllTaskWithoutSorting(),
		placeholderData: prev => prev,
	});
	return { tasks, isPending, isFetching };
}
