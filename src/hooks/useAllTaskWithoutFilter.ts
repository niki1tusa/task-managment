import { useQuery } from '@tanstack/react-query';

import type { TTask } from '@/shared/types/task.types';

import { getClientAllTaskWithoutSorting } from '@/services/tasks/task-client.service';

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
