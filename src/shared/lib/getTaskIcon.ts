import { type IconName, MODAL_ICON } from '@/shared/config/icon-config';
import type { TTask } from '@/shared/model/task-types';

export function getTaskIcon(task: TTask) {
	const TaskIcon = MODAL_ICON[task.icon as IconName];
	return TaskIcon;
}
