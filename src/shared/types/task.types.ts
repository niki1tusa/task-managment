import type { Database } from './db.types';

export type TTask = Database['public']['Tables']['task']['Row'] & { sub_task: TSubTask[] };
export type TSubTask = Database['public']['Tables']['sub_task']['Row'];

export type TTaskEditForm = Database['public']['Tables']['task']['Update']