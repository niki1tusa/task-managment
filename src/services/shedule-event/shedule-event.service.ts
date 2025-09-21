import type { Database } from '@/shared/types/db/db.types';

import { createClient } from '@/utils/supabase/client';
export type TEventInsert = Database['public']['Tables']['schedule_events']['Insert']
export async function insertEvent(fields: TEventInsert) {
	const client = createClient();
	const { data, error } = await client.from('schedule_events').insert(fields).select().single();
    if(!data || error) throw new Error('Fail the during event addition!')
	return data;
}
