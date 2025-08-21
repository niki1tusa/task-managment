import type { TChatMessageUpdate } from '@/components/ui/chat/message/message.types';

import { createClient } from '@/utils/supabase/client';

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
