import { addHours, format } from 'date-fns';

import type { TTaskCreateForm } from '@/shared/types/task/task.types';

export function prepareTaskPayload(data: TTaskCreateForm) {

	const now = new Date();
	const startTime = format(now, 'HH:mm:ss');
	const endTime = format(addHours(now, 2), 'HH:mm:ss');
  
	return {
		...data,
		start_time: startTime,
		end_time: endTime,
	};
}
