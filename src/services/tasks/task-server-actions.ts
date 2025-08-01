'use server';

import type { Database } from '@/shared/types/db.types';

import { createFromServer } from '@/utils/supabase/server';

export async function getAllTask() {
	return (await createFromServer()).from('task').select(`*, sub_task(*)`);
}

export async function getTodayTasks() {
	return (await createFromServer())
		.from('task')
		.select(`*, sub_task(*)`)
		.eq('due_date', new Date().toISOString().split('T')[0]);
}
export async function getProfile(id: string) {
	return (await createFromServer()).from('public').select(`profile`).eq('id', id).single();
}
