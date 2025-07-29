'use server';

import type { ITask } from '@/shared/types/task.types';
import { createFromServer } from '@/utils/supabase/server';

export async function taskServiceGetAll() {
	return (await createFromServer()).from('task').select(`*, sub_task(*)`) as unknown as ITask[];
}

export async function taskServiceUpdateTask(id: string, data: ITask) {
	return (await createFromServer()).from('task').update({...data}).eq('id', id);
}
