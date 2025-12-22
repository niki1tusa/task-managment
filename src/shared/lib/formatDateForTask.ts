import { parseISO } from 'date-fns';

import type { Task } from '@/shared/model/task-types';

export function useFormatDateForTask(task: Task) {
	const start = task.start_time ? parseISO(`${task.due_date}T${task.start_time}`) : null;
	const end = task.end_time ? parseISO(`${task.due_date}T${task.end_time}`) : null;

	return { start, end };
}
