import { useQuery } from '@tanstack/react-query';

import type { TByAscOrDesc, TStatus, TTask } from '@/shared/types/task.types';

import { getClientAllTask } from '@/services/tasks/task-client.service';

interface Props {
	select?: TStatus;
	sortOrder?: TByAscOrDesc;
}
export function useMyTasks({ select, sortOrder }: Props = {}) {
	const {
		data: tasks,
		isPending,
		isFetching,
	} = useQuery<TTask[], Error>({
		queryKey: ['tasks', { select, sortOrder }],
		queryFn: () => getClientAllTask({ status: select, sortByDue: sortOrder }),
		placeholderData: prev => prev,
	});
	return { tasks, isPending, isFetching };
}
