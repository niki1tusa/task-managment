import type { TStatus, Task } from '@/shared/model/task-types';

export function filterStatusTasks(tasks: Task[], status?: TStatus) {
	return tasks.filter(item => {
		switch (status) {
			case 'Completed':
				return item.sub_task.every(sub_task => sub_task.is_completed);
			case 'in-progress':
				return item.sub_task.some(sub_task => sub_task.is_completed);
			case 'not-started':
				return item.sub_task.every(sub_task => !sub_task.is_completed);
			default:
				return true;
		}
	});
}
