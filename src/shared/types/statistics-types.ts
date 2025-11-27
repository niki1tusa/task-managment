import type { Database } from './db.types';
import type { fetchClientChartPoint } from '@/services/statistics/chart-point-client.service';
import type { fetchChartPoint } from '@/services/statistics/chart-point-server.service';
import type { fetchProjectStat } from '@/services/statistics/project-stat-server.service';

export type ITimeRange = {
	label: string;
	value: 'yearly' | 'monthly';
};

export type TProjectStatRow = Database['public']['Tables']['project_stat']['Row'];
export type TChartPointRow = Database['public']['Tables']['chart_point']['Row'];

type DataOf<T> = NonNullable<Awaited<T> extends { data: infer D } ? D : Awaited<T>>;
export type TGetProjectStatResponse = DataOf<ReturnType<typeof fetchProjectStat>>;

export type TGetChartPointResponse = DataOf<ReturnType<typeof fetchChartPoint>>;

export type TGetClientChartPointResponse = DataOf<ReturnType<typeof fetchClientChartPoint>>;
