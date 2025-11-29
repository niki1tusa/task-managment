import type { Database } from '@/shared/types/db-types';
import type { TProfileRow } from '@/shared/types/task-types';

export type TChatMessageRow = Database['public']['Tables']['chat_message']['Row'] & {
	profile: TProfileRow;
};
export type TChatMessageUpdate = Database['public']['Tables']['chat_message']['Update'];
