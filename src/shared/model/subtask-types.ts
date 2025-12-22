import type { Database } from './db-types';

export type SubTask = Database['public']['Tables']['sub_task']['Row'];
export type TSubTaskInsert = Database['public']['Tables']['sub_task']['Insert'];
