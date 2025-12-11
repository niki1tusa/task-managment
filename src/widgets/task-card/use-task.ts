import { useCallback } from 'react';

import type { TSubTaskRow } from '@/shared/model/subtask-types';
import type { TTask } from '@/shared/model/task-types';
import { useRouter } from 'next/navigation';

export function useTask() {
	const router = useRouter();

	const status = useCallback((data: TTask) => {
		return Math.floor(
			(data.sub_task.filter((item: TSubTaskRow) => item.is_completed === true).length /
				data.sub_task.length) *
				100
		);
	}, []);
	return { router, status };
}
