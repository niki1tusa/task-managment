'use client';

import { createClient } from '@/utils/supabase/client';

export async function fetchClientChartPoint(rangeType: 'yearly' | 'monthly') {
	const supabase = createClient();

	const { data, error } = await supabase
		.from('chart_point')
		.select('*')
		.eq('type', rangeType)
		.order('period', { ascending: true });
	if (error || !data) {
		throw new Error(error.message || 'Failed to fetch project chart data');
	}
	return data 
}
