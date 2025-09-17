'use client';

import type { Database } from '@/shared/types/db/db.types';
import type {
	TByAscOrDesc,
	TStatus,
	TTaskCreateForm,
	TTaskEditForm,
} from '@/shared/types/task/task.types';

import { filterStatusTasks } from '@/utils/filterStatusTasks';
import { createClient } from '@/utils/supabase/client';

// read
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
// create
export async function createClientTask(task: TTaskCreateForm) {
	const client = createClient();
	const {
		data: { user },
	} = await client.auth.getUser();
	const { data, error } = await client
		.from('task')
		.insert({
			...task,
			owner_id: user?.id,
		})
		.select()
		.single();

	if (error || !data) throw new Error(error?.message || 'create task is failed');
	const { error: errParticipants } = await client
		.from('task_participants')
		.insert({ task_id: data.id, profile_id: user?.id });
	if (errParticipants) {
		throw new Error('Fail with create task (participants)!');
	}
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

// update
export async function updateClientTask(id: string, task: TTaskEditForm) {
	const { data, error } = await createClient()
		.from('task')
		.update(task)
		.eq('id', id)
		.select(`*, sub_task(*)`)
		.single();

	if (error || !data) throw new Error(error?.message || 'Task not found/ update-task');
	return data;
}
// delete
export async function deleteClientTask(id: string) {
	const { data, error } = await createClient().from('task').delete().eq('id', id);
	if (error) throw new Error(error?.message || 'Task not found/ delete-task');
	return data;
}

// update task participants
export async function insertTaskParticipants(id: string, profile_ids: string[]) {
	const { data, error } = await createClient()
		.from('task_participants')
		.insert({ task_id: id, profile_id: profile_ids[0] })
		.eq('id', id)
		.select()
		.single();

	if (error || !data) throw new Error(error?.message || 'Task not found, insert-task_participants');
	return data;
}

export async function deleteTaskParticipants(profileId: string) {
	const { error } = await createClient()
		.from('task_participants')
		.delete()
		.eq('profile_id', profileId);

	if (error) throw new Error(error?.message || 'Task not found, delete-task_participants');
	return;
}
// TODO: 
// 1) auto-scroll for Panel and Team Task
// 2) не происходит re-render for Panel при добавлении и при удалении profile - какие данные useQuery отображаются в panel?
// 3) проверить везде DARK THEME на message, dashboard, notice
// 4) sort for team page 
// в  task panel можно назначать на subtask
// при нажатии на task (active) on team page - под ним открывается меню с subtask

// 5) schedule upgrade 

// 6) ошибки при деплое исправить
