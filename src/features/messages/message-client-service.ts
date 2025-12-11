import { createClient } from '@/shared/lib/supabase/client';

import type { TChatMessageUpdate } from '@/features/messages/model/message-types';

// update
export async function updateMessage(msg: TChatMessageUpdate) {
	const { data, error } = await createClient()
		.from('chat_message')
		.update(msg)
		.eq('id', msg.id)
		.select('*')
		.single();
	if (error) throw new Error(error.message);
	return data;
}
// delete
export async function deleteMessage(id: string) {
	const { error } = await createClient().from('chat_message').delete().eq('id', id);
	if (error) throw new Error(error.message);
	return;
}
