import type {
	TChannelInsert,
	TChannelParticipantsRow,
	TChannelUpdate,
} from '@/components/pages/messages/channel/channel.types';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { createClient } from '@/utils/supabase/client';

// read
function throwSB(error: any) {
	const msg = [error?.message, error?.code, error?.details, error?.hint]
		.filter(Boolean)
		.join(' | ');
	throw new Error(msg || 'Unknown Supabase error');
}

export async function getClientChannels() {
	const supabase = createClient();

	// важно: должен быть активный user (иначе auth.uid() = null и RLS всё отрежет)
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) throw new Error('Not authenticated');

	const { data, error } = await supabase
		.from('channel')
		.select('*')
		.order('created_at', { ascending: true });

	if (error) throwSB(error.message);
	return data ?? [];
}
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export async function getChannelParticipantsById(id: string) {
	if (!UUID_V4.test(id)) {
		throw new Error('Invalid channel id');
	}
	const { data, error } = await createClient()
		.from('channel_participants')
		.select('role, profile:profile_id(id, name, avatar_path, email)')
		.eq('channel_id', id);

	if (error || !data) throwSB(error?.message || 'Channel not found');
	return (data ?? []) as TChannelParticipantsRow[];
}


export async function getMyDirectPartnerIds(myProfileId: string): Promise<string[]> {
  const supabase = createClient();

  // Шаг 1: взять прямые каналы, в которых участвует текущий пользователь
  const { data: myLinks, error: e1 } = await supabase
    .from('channel_participants')
    .select('channel_id, profile_id, channel:channel!inner(type)')
    .eq('profile_id', myProfileId)
    .eq('channel.type', 'direct'); // фильтр по join-таблице channel

  if (e1) throw e1;

  const channelIds = (myLinks ?? []).map(r => r.channel_id);
  if (channelIds.length === 0) return [];

  // Шаг 2: по этим каналам взять всех участников и отфильтровать "не я"
  const { data: allLinks, error: e2 } = await supabase
    .from('channel_participants')
    .select('profile_id, channel_id')
    .in('channel_id', channelIds);

  if (e2) throw e2;

  const partners = new Set<string>();
  for (const row of allLinks ?? []) {
    if (row.profile_id && row.profile_id !== myProfileId) {
      partners.add(row.profile_id);
    }
  }
  return [...partners];
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
	const { error: insertError } = await client.from('channel_participants').insert(
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
export async function createClientChannelDirect(
	channelFields: TChannelInsert,
	profile: TProfileRow
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
		.insert({ ...channelFields, type: 'direct', created_by: user.id, name: profile.name })
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
// update
export async function renameChannel(channel: TChannelUpdate) {
	const { data, error } = await createClient().from('channel').update(channel).eq('id', channel.id);
	if (error) throw new Error(error.message);
	return data;
}
// delete
export async function deleteClientChannel(id: string) {
	const { error } = await createClient().from('channel').delete().eq('id', id);
	if (error) throw new Error(error.message);
	return;
}
