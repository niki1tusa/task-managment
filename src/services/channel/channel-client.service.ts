import type { TChannelInsert } from '@/app/dashboard/messages/channel.types';
import type { TProfileRow } from '@/shared/types/task/task.types';

import { createClient } from '@/utils/supabase/client';

// read

// TODO: сделать так чтобы пользователь не мог добавить себя

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
	return data;
}

// create
export async function createClientChannelByTaskId(channelFields: TChannelInsert, taskId: string) {
	const client = createClient();
	// получаем текущего пользователя
	const {
		data: { user },
		error: userError,
	} = await client.auth.getUser();
	if (userError || !user) throw new Error('Not authenticated');
	const { data: newChannel, error: newChannelError } = await client
		.from('channel')
		.insert({
			...channelFields,
			task_id: taskId,
			type: 'task',
			created_by: user.id,
		})
		.select()
		.single();

	if (newChannelError || !newChannel) {
		throw new Error(newChannelError?.message || 'Failed to create channel');
	}
	// add owner channel in participants
	const { error: pErr } = await client
		.from('channel_participants')
		.insert({ channel_id: newChannel.id, profile_id: user.id, role: 'owner' });
	if (pErr) throw new Error(pErr.message);

	// Участники добавятся автоматически триггером в БД
	return newChannel;
}

// group
export async function createClientChannelGroup(
	channelFields: TChannelInsert,
	profilesId: string[]
) {
	const client = createClient();
	// получаем текущего пользователя
	const {
		data: { user },
		error: userError,
	} = await client.auth.getUser();
	if (userError || !user) throw new Error('Not authenticated');
	// 1) create channel
	const { data: newChannel, error } = await client
		.from('channel')
		.insert({ ...channelFields, type: 'group', created_by: user.id })
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
	// add owner channel in participants
	const { error: pErr } = await client
		.from('channel_participants')
		.insert({ channel_id: newChannel.id, profile_id: user.id, role: 'owner' });
	if (pErr) throw new Error(pErr.message);

	return newChannel;
}

// direct
export async function createClientChannelDirect(channelFields: TChannelInsert, profile: TProfileRow) {
	const client = createClient();
	// получаем текущего пользователя
	const {
		data: { user },
		error: userError,
	} = await client.auth.getUser();
	if (userError || !user) throw new Error('Not authenticated');
	// 1) create channel
	const { data: newChannel, error } = await client
		.from('channel')
		.insert({ ...channelFields, type: 'direct', created_by: user.id, name: profile.name  })
		.select()
		.single();
	if (error) throw new Error(error.message);

	// 2) add participants in channel_participants table
	const { error: insertError } = await client.from('channel_participants').insert({
		channel_id: newChannel.id,
		profile_id: profile.id,
		role: 'member',
	});
	if (insertError) throw new Error(insertError?.message);
	// add owner channel in participants
	const { error: pErr } = await client
		.from('channel_participants')
		.insert({ channel_id: newChannel.id, profile_id: user.id, role: 'owner' });
	if (pErr) throw new Error(pErr.message);

	return newChannel;
}

// delete
export async function deleteClientChannel(id: string) {
	const { error } = await createClient().from('channel').delete().eq('id', id);
	if (error) throw new Error(error.message);
	return;
}
