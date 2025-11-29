'use server';

import { createFromServer } from '@/utils/supabase/server';

export async function fetchChartPoint(rangeType: 'yearly' | 'monthly') {
	const supabase = await createFromServer();

	return supabase.from('chart_point').select('*').eq('type', rangeType).order('period', {ascending: true})
}
