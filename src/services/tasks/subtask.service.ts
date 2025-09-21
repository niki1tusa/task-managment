'use client';

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