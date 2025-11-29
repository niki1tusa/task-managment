
import { type IconName, MODAL_ICON } from '@/config/icon-config';
import type { TTask } from '@/shared/types/task-types';

export function getTaskIcon(task: TTask) {
  const TaskIcon = MODAL_ICON[task.icon as IconName];
  return TaskIcon
}