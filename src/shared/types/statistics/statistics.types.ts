import type { Database } from '../db/db.types';

import type { fetchClientChartPoint } from '@/services/statistics/chart-point-client.service';
import type { fetchChartPoint } from '@/services/statistics/chart-point-server.service';
import type { fetchProjectStat } from '@/services/statistics/project-stat-server.service';

export type ITimeRange = {
	label: string;
	value: 'yearly' | 'monthly';
};

export type TProjectStatRow = Database['public']['Tables']['project_stat']['Row'];
export type TChartPointRow = Database['public']['Tables']['chart_point']['Row'];

export type TGetProjectStatResponse = NonNullable<
	Awaited<ReturnType<typeof fetchProjectStat>>['data']
>;

export type TGetChartPointResponse = NonNullable<
	Awaited<ReturnType<typeof fetchChartPoint>>['data']
>;

export type TGetClientChartPointResponse = NonNullable<
	Awaited<ReturnType<typeof fetchClientChartPoint>>['data']
>;
