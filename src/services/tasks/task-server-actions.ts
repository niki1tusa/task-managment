'use server';

import { createFromServer } from '@/utils/supabase/server';

export async function getServerAllTask() {
	return (await createFromServer()).from('task').select(`*, sub_task(*)`);
}

export async function getServerTodayTasks() {
	return (await createFromServer())
		.from('task')
		.select(`*, sub_task(*), task_participants(profile(*))`)
		.eq('due_date', new Date().toISOString().split('T')[0]);
}

