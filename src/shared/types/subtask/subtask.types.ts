import type { Database } from "../db/db.types";

export type TSubTaskRow = Database['public']['Tables']['sub_task']['Row'];
export type TSubTaskInsert = Database['public']['Tables']['sub_task']['Insert']