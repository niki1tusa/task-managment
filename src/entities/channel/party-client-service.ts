import { createClient } from '@/shared/lib/supabase/client';

// update

export async function insertProfilesIntoChannel(channelId: string, profileIds: string[]) {
	const supabase = createClient();

	if (!channelId) throw new Error('channelId is required');

	const {
		data: { user },
		error: userErr,
	} = await supabase.auth.getUser();
	if (userErr || !user) throw new Error('Not authenticated');

	const clean = Array.from(new Set(profileIds.filter(Boolean))).filter(id => id !== user.id);
	if (clean.length === 0) return [];

	const { data, error } = await supabase
		.from('channel_participants')
		.upsert(
			clean.map(pid => ({
				channel_id: channelId,
				profile_id: pid,
				role: 'member',
			})),
			{ onConflict: 'channel_id,profile_id' }
		)
		.select();

	if (error) throw new Error(error.message);
	return data ?? [];
}

// delete
export async function deleteClientProfileFromPartyChannel(id: string) {
	const { error } = await createClient().from('channel_participants').delete().eq('profile_id', id);
	if (error) throw new Error(error.message);
	return;
}
