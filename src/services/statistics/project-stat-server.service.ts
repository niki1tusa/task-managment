'use server';

import { createFromServer } from '@/utils/supabase/server';

export async function fetchProjectStat() {
	const supabase = await createFromServer();

	return supabase.from('project_stat').select('*');
}
