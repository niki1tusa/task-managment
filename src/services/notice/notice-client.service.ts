import type { TNoticeRow } from '@/components/pages/notification/notice.types';

import { createClient } from '@/utils/supabase/client';

// READ
export async function getNoticesByProfileId(profileId: string) {
	const client = createClient();
	const { data, error } = await client.from('notice').select('*').eq('profile_id', profileId);
	if (error) throw new Error('Notice is fail, notice-client-service-ts');
	return data;
}
// UPDATE
export async function updateStatusNotice(id: string, status: boolean = true) {
	const client = createClient();
	const { data, error } = await client
		.from('notice')
		.update({ status })
		.eq('id', id)
		.select('*')
		.single<TNoticeRow>();

	if (error) {
		console.error('updateStatusNotice:', error);
		throw new Error(error.message || 'Failed to update notice status');
	}
	return data; // TNoticeRow
}
