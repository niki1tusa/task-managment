import type { Database } from './db-types';
import type { SubTask } from './subtask-types';
import type { getServerAllTask } from '@/entities/task/api/task-server-service';

export type ProfileRow = Database['public']['Tables']['profile']['Row'];

export type Participants = Database['public']['Tables']['task_participants']['Row'] & {
	profile: ProfileRow;
};

export type Task = Database['public']['Tables']['task']['Row'] & {
	sub_task: SubTask[];
	task_participants: Participants[];
};
export type TaskCreateForm = Database['public']['Tables']['task']['Insert'];
export type TaskEditForm = Database['public']['Tables']['task']['Update'];

export type TGetTasksResponse = NonNullable<Awaited<ReturnType<typeof getServerAllTask>>['data']>;
export type TGetTodayTasksResponse = NonNullable<
	Awaited<ReturnType<typeof getServerAllTask>>['data']
>;

export type TStatus = 'Completed' | 'in-progress' | 'not-started' | 'All';
export type TByAscOrDesc = 'Asc' | 'Desc';
