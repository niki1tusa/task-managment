import type { Database } from '@/shared/model/db-types';
import type { ProfileRow } from '@/shared/model/task-types';

export type TChatMessageRow = Database['public']['Tables']['chat_message']['Row'] & {
	profile: ProfileRow;
};
export type TChatMessageUpdate = Database['public']['Tables']['chat_message']['Update'];
