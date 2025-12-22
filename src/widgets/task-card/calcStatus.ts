import type { SubTask } from '@/shared/model/subtask-types';

export function calcStatus(sub_task: SubTask[]) {
	return Math.floor(
		(sub_task.filter((item: SubTask) => item.is_completed === true).length / sub_task.length) * 100
	);
}
