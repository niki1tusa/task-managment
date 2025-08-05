'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import type {
	ITimeRange,
	TGetChartPointResponse,
	TGetClientChartPointResponse,
} from '@/shared/types/statistics/statistics.types';

import { ProjectChart } from './ProjectChart';
import { ProjectChartHeader } from './header/ProjectChartHeader';
import { fetchClientChartPoint } from '@/services/statistics/chart-point-client.service';

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
		<div className='text-foreground z-10 rounded-2xl border border-white shadow shadow-neutral-500 dark:border-none'>
			<ProjectChartHeader onChangeRange={setSelectedRange} selectedRange={selectedRange} />
			<ProjectChart data={data} />
		</div>
	);
}
