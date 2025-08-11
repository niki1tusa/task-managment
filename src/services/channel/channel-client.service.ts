import type { TChannelInsert } from '@/app/dashboard/messages/channel.types';

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

export async function getChannelParticipantsById(id: string) {
	const { data, error } = await createClient()
		.from('channel_participants')
		.select('role, profile:profile_id(id, name, avatar_path, email)')
		.eq('channel_id', id);

	if (error || !data) throw new Error(error?.message || 'Channel not found');
	return {data};
}

// create
export async function createClientChannelByTaskId(channelFields: TChannelInsert, taskId: string) {
	const { data: newChannel, error: newChannelError } = await createClient()
		.from('channel')
		.insert({
			...channelFields,
			task_id: taskId,
			type: 'task',
		})
		.select()
		.single();

	if (newChannelError || !newChannel) {
		throw new Error(newChannelError?.message || 'Failed to create channel');
	}

	// Участники добавятся автоматически триггером в БД
	return newChannel;
}

// group
export async function createClientChannelGroup(
	channelFields: TChannelInsert,
	profilesId: string[]
) {
	// 1) create channel
	const { data: newChannel, error } = await createClient()
		.from('channel')
		.insert({ ...channelFields, type: 'group' })
		.select()
		.single();
	if (error) throw new Error(error.message);
	// 2) add participants in channel_participants table
	const { error: insertError } = await createClient()
		.from('channel_participants')
		.insert(
			profilesId.map(p => ({
				channel_id: newChannel.id,
				profile_id: p,
				role: 'member',
			}))
		);
	if (insertError) throw new Error(insertError?.message);

	return newChannel;
}

// direct
export async function createClientChannelDirect(channelFields: TChannelInsert, profileId: string) {
	// 1) create channel
	const { data: newChannel, error } = await createClient()
		.from('channel')
		.insert({ ...channelFields, type: 'direct' })
		.select()
		.single();
	if (error) throw new Error(error.message);
	// 2) add participants in channel_participants table
	const { error: insertError } = await createClient().from('channel_participants').insert({
		channel_id: newChannel.id,
		profile_id: profileId,
		role: 'member',
	});
	if (insertError) throw new Error(insertError?.message);

	return newChannel;
}
