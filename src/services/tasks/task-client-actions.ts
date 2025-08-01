'use client';

import type { Database } from '@/shared/types/db.types';

import { createClient } from '@/utils/supabase/client';

export async function getClientTaskById(id: string) {
	const { data, error } = await createClient()
		.from('task')
		.select(`*, sub_task(*)`)
		.eq('id', id)
		.single();
	if (error || !data) throw new Error(error?.message || 'Task not found');
	return data;
}
export async function createClientTask(task: Database['public']['Tables']['task']['Insert']) {
	const { data, error } = await createClient().from('task').insert(task).single();
}

export async function updateClientTask(
	id: string,
	task: Database['public']['Tables']['task']['Update']
) {
	const { data, error } = await createClient()
		.from('task')
		.update(task)
		.eq('id', id)
		.select(`*, sub_task(*)`)
		.single();
	if (error || !data) throw new Error(error?.message || 'Task not found');
	return data;
}
export async function deleteClientTask(id: string) {
	const { data, error } = await createClient().from('task').delete().eq('id', id);
	if (error || !data) throw new Error(error?.message || 'Task not found');
	return data;
}
export async function createClientSubTask(
	id: string,
	sub_task: Database['public']['Tables']['sub_task']['Insert']
) {
	const { data, error } = await createClient()
		.from('sub_task')
		.insert({ ...sub_task, task_id: id })
		.single();
	if (error || !data) throw new Error(error?.message || 'Task not found');
	return data;
}
