import { parseISO } from 'date-fns';

import type { TSubTaskRow } from '@/shared/types/subtask.types';
import type { TTask } from '@/shared/types/task.types';

import { type IconName, MODAL_ICON } from '@/config/icon-config';

export function useFormatDateForTask(task: TTask) {
	const TaskIcon = MODAL_ICON[task.icon as IconName];
	const date = Math.ceil((new Date(task.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
	const start = task.start_time ? parseISO(`${task.due_date}T${task.start_time}`) : null;
	const end = task.end_time ? parseISO(`${task.due_date}T${task.end_time}`) : null;

	const displayDue =
		date === 0
			? 'Today'
			: date < 0
				? task.sub_task.every((subTask: TSubTaskRow) => subTask.is_completed)
					? 'Done'
					: 'Overdue'
				: ` ${date} days`;
	return { TaskIcon, start, end, displayDue };
}
