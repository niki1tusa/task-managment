import type { Database } from '@/shared/types/db.types';

import { createClient } from '@/utils/supabase/client';

export type TEventRow = Database['public']['Tables']['schedule_events']['Row'];
export type TEventInsert = Database['public']['Tables']['schedule_events']['Insert'];

// insert
export async function insertEvent(fields: TEventInsert) {
	const client = createClient();
	const { data, error } = await client.from('schedule_events').insert(fields).select().single();
	if (!data || error) throw new Error('Fail the during event addition!');
	return data;
}
//  select
export async function getAllEvents() {
	const client = createClient();
	const { data, error } = await client.from('schedule_events').select('*');
	if (!data || error) throw new Error('Fail the during event getting!');
	return data;
}
