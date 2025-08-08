'use client';

import type { Database } from '@/shared/types/db/db.types';
import type { TByAscOrDesc, TStatus, TTask, TTaskCreateForm } from '@/shared/types/task/task.types';

import { filterStatusTasks } from '@/utils/filterStatusTasks';
import { createClient } from '@/utils/supabase/client';

export async function getClientAllTask({
	status,
	sortByDue,
}: {
	status?: TStatus;
	sortByDue?: TByAscOrDesc;
}) {
	const client = createClient();
	let query = client.from('task').select(`*, sub_task(*),task_participants(profile(*))`);
	if (sortByDue) {
		query = query.order('due_date', {
			ascending: sortByDue === 'Asc',
		});
	}
	const { data, error } = await query;
	if (error || !data) throw new Error(error?.message || 'Task not found/ get-all-task');
	if (status) {
		return filterStatusTasks(data, status);
	}
	return data;
}

export async function getClientTaskById(id: string) {
	const { data, error } = await createClient()
		.from('task')
		.select(`*, sub_task(*)`)
		.eq('id', id)
		.single();
	if (error || !data) throw new Error(error?.message || 'Task not found/ task by id');
	return data;
}
export async function createClientTask(task: TTaskCreateForm) {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { data, error } = await createClient()
		.from('task')
		.insert({
			...task,
			owner_id: user?.id,
		})
		.select()
		.single();
	if (error || !data) throw new Error(error?.message || 'create task is failed');
	return data;
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

	if (error || !data) throw new Error(error?.message || 'Task not found/ update-task');
	return data;
}
export async function deleteClientTask(id: string) {
	const { data, error } = await createClient().from('task').delete().eq('id', id);
	if (error || !data) throw new Error(error?.message || 'Task not found/ delete-task');
	return data;
}
export async function createClientSubTask(
	id: string,
	sub_task: Database['public']['Tables']['sub_task']['Insert']
) {
	const { data, error } = await createClient()
		.from('sub_task')
		.insert({ ...sub_task, task_id: id })
		.select()
		.single();
	if (error || !data) throw new Error(error?.message || 'Task not found/ create-sub-task');
	return data;
}
