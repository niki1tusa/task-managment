'use server';

import type { TTask } from '@/shared/types/task.types';

import { createFromServer } from '@/utils/supabase/server';

export async function taskServiceGetAll() {
	return (await createFromServer()).from('task').select(`*, sub_task(*)`);
}

export async function taskServiceUpdateTask(id: string, data: TTask) {
	return (await createFromServer())
		.from('task')
		.update({ ...data })
		.eq('id', id);
}
