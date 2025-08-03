'use client';

import { useMemo, useState } from 'react';

import { monthlyData, yearlyData } from '../../../../shared/data/project-chart.data';
import type { ITimeRange } from '../../../../shared/types/project-chart.types';

import { ProjectChart } from './ProjectChart';
import { ProjectChartHeader } from './header/ProjectChartHeader';

export function ProjectStatisticsChart() {
	const [selectedRange, setSelectedRange] = useState<ITimeRange>({
		label: 'Yearly',
		value: 'yearly',
	});
	const currentData = useMemo(() => {
	return	selectedRange.value === 'yearly' ? yearlyData : monthlyData;
	}, [selectedRange]);
	return (
		<div className='text-foreground rounded-2xl border border-white shadow z-10 shadow-neutral-500 dark:border-none'>
			<ProjectChartHeader onChangeRange={setSelectedRange} selectedRange={selectedRange} />
			<ProjectChart data={currentData} />
		</div>
	);
}
