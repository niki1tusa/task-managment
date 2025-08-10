


import { createClient } from '@/utils/supabase/client';

// read
export async function getClientChannels() {
	const { data, error } = await createClient()
		.from('channel')
		.select('*')
		.order('created_at', { ascending: true });
	if (error || !data) throw new Error(error?.message || 'Channel not found');

	return data;
}
