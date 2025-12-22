import { useQuery } from '@tanstack/react-query';

import type { TByAscOrDesc, TStatus, Task } from '@/shared/model/task-types';

import { getClientAllTask } from '@/entities/task/api/task-client-service';

interface Props {
	select?: TStatus;
	sortOrder?: TByAscOrDesc;
}
export function useMyTasks({ select, sortOrder }: Props = {}) {
	const {
		data: tasks,
		isPending,
		isFetching,
	} = useQuery<Task[], Error>({
		queryKey: ['tasks', select, sortOrder],
		queryFn: () => getClientAllTask({ status: select, sortByDue: sortOrder }),
		placeholderData: prev => prev,
	});
	return { tasks, isPending, isFetching };
}
