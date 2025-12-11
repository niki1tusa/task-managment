import type { Database } from '@/shared/model/db-types';
import type { TProfileRow } from '@/shared/model/task-types';

export type TChatMessageRow = Database['public']['Tables']['chat_message']['Row'] & {
	profile: TProfileRow;
};
export type TChatMessageUpdate = Database['public']['Tables']['chat_message']['Update'];
