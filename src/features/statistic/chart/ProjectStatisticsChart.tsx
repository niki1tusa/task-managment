'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { ProjectChart } from './ProjectChart';
import { ProjectChartHeader } from './header/ProjectChartHeader';
import { fetchClientChartPoint } from '@/features/statistic/api/chart-point-client-service';
import type {
	ITimeRange,
	TGetClientChartPointResponse,
} from '@/features/statistic/statistics-types';

export function ProjectStatisticsChart({
	chartPoints,
}: {
	chartPoints: TGetClientChartPointResponse;
}) {
	const [selectedRange, setSelectedRange] = useState<ITimeRange>({
		label: 'Yearly',
		value: 'yearly',
	});

	const { data } = useQuery({
		queryKey: ['chart-point', selectedRange.value],
		queryFn: () => fetchClientChartPoint(selectedRange.value),
		initialData: chartPoints,
	});

	return (
		<div className='text-foreground bg-side z-10 rounded-2xl border border-white shadow shadow-neutral-500 dark:border-none'>
			<ProjectChartHeader onChangeRange={setSelectedRange} selectedRange={selectedRange} />
			<ProjectChart data={data} />
		</div>
	);
}
