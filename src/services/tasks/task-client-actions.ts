'use client'
import type { Database } from '@/shared/types/db.types';

import { createClient } from '@/utils/supabase/client';

export function getClientTaskById(id: string) {
	return createClient().from('task').select(`*, sub_task(*)`).eq('id', id).single();
}
export  function createClientTask(task: Database['public']['Tables']['task']['Insert']) {
	return createClient().from('task').insert(task).single();
}

export  function updateClientTask(id: string, task: Database['public']['Tables']['task']['Update']) {
	return createClient().from('task').update(task).eq('id', id).select(`*, sub_task(*)`).single();
}
export  function deleteClientTask(id: string) {
	return createClient().from('task').delete().eq('id', id);
}
export  function createClientSubTask(
	id: string,
	sub_task: Database['public']['Tables']['sub_task']['Insert']
) {
	return createClient()
		.from('sub_task')
		.insert({ ...sub_task, task_id: id })
		.single();
}
