import type { Database } from '../db/db.types';

import type { getServerAllTask } from '@/services/tasks/task-server.service';

export type TChatMessageRow = Database['public']['Tables']['chat_message']['Row'] & {
	profile: TProfileRow;
};
export type TTaskRow = Database['public']['Tables']['task']['Row'];
export type TSubTaskRow = Database['public']['Tables']['sub_task']['Row'];
export type TProfileRow = Database['public']['Tables']['profile']['Row'];

export type TParticipants = Database['public']['Tables']['task_participants']['Row'] & {
	profile: TProfileRow;
};

export type TTask = Database['public']['Tables']['task']['Row'] & {
	sub_task: TSubTaskRow[];
	task_participants: TParticipants[];
};
export type TTaskCreateForm = Database['public']['Tables']['task']['Insert'];
export type TTaskEditForm = Database['public']['Tables']['task']['Update'];

export type TGetTasksResponse = NonNullable<Awaited<ReturnType<typeof getServerAllTask>>['data']>;
export type TGetTodayTasksResponse = NonNullable<
	Awaited<ReturnType<typeof getServerAllTask>>['data']
>;

export type TStatus = 'Completed' | 'in-progress' | 'not-started' | 'All';
export type TByAscOrDesc = 'Asc' | 'Desc';
