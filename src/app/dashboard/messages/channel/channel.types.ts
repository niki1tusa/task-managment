import type { Database } from '@/shared/types/db/db.types';

export type TChannelRow = Database['public']['Tables']['channel']['Row'];
export type TChannelInsert = Database['public']['Tables']['channel']['Insert']
export type TChannelUpdate = Database['public']['Tables']['channel']['Update']