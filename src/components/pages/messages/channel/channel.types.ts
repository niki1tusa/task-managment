import type { Database } from '@/shared/types/db.types';
import type { TProfileRow } from '@/shared/types/task.types';

export type TChannelRow = Database['public']['Tables']['channel']['Row'];
export type TChannelInsert = Database['public']['Tables']['channel']['Insert'];
export type TChannelUpdate = Database['public']['Tables']['channel']['Update'];

export type TChannelParticipantsRow =
	Database['public']['Tables']['channel_participants']['Row'] & { profile: TProfileRow[] };
