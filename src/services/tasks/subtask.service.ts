'use client';

import type { TSubTaskInsert } from '@/shared/types/subtask/subtask.types';
import { createClient } from '@/utils/supabase/client';

export async function addProfileForSubtask(subTaskId: string, profileId: string) {
    const client = createClient();
    const {data, error} =  await client.from('sub_task').update({profile_id: profileId}).eq('id', subTaskId).select().single()
    if(!data || error) throw new Error('Fail by add profile on subtask!')
    return data;
}
export async function removeProfileForSubtask(subTaskId: string) {
    const client = createClient();
    const {data, error} =  await client.from('sub_task').update({profile_id: null}).eq('id', subTaskId).select().single()
    if(!data || error) throw new Error('Fail by remove profile on subtask!')
    return data;
}
export async function createClientSubTask(
    id: string,
    sub_task: TSubTaskInsert
) {
    const { data, error } = await createClient()
        .from('sub_task')
        .insert({ ...sub_task, task_id: id })
        .select()
        .single();
    if (error || !data) throw new Error(error?.message || 'Task not found/ create-sub-task');
    return data;
}