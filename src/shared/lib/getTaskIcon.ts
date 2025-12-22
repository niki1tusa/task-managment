import { type IconName, MODAL_ICON } from '@/shared/config/icon-config';
import type { Task } from '@/shared/model/task-types';

export function getTaskIcon(task: Task) {
	const TaskIcon = MODAL_ICON[task.icon as IconName];
	return TaskIcon;
}
