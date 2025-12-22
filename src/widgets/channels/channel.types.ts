import type { Database } from '@/shared/model/db-types';
import type { ProfileRow } from '@/shared/model/task-types';

export type TChannelRow = Database['public']['Tables']['channel']['Row'];
export type TChannelInsert = Database['public']['Tables']['channel']['Insert'];
export type TChannelUpdate = Database['public']['Tables']['channel']['Update'];

export type TChannelParticipantsRow =
	Database['public']['Tables']['channel_participants']['Row'] & { profile: ProfileRow[] };
