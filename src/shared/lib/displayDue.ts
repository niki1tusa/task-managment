import type { SubTask } from '../model/subtask-types';
import type { Task } from '../model/task-types';

export function displayDueFnc(task: Task) {
	const date = Math.ceil((new Date(task.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

	const displayDue =
		date === 0
			? 'Today'
			: date < 0
				? task.sub_task.every((subTask: SubTask) => subTask.is_completed)
					? 'Done'
					: 'Overdue'
				: ` ${date} days`;
	return displayDue;
}
