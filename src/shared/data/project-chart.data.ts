import type { IChartDataPoint, ITimeRange } from '../types/project-chart.types';

export const yearlyData: IChartDataPoint[] = [
	{ period: 'Jan', value: 23 },
	{ period: 'Feb', value: 12 },
	{ period: 'Mar', value: 30 },
	{ period: 'Apr', value: 45 },
	{ period: 'May', value: 30 },
	{ period: 'Jun', value: 23 },
];

export const MonthlyData: IChartDataPoint[] = [
	{ period: '1 week', value: 23 },
	{ period: '2 week', value: 12 },
	{ period: '3 week', value: 30 },
	{ period: '4 week', value: 45 },
];

export const timeRange: ITimeRange[] = [
	{ label: 'Yearly', value: 'yearly' },
	{ label: 'Monthly', value: 'monthly' },
];
