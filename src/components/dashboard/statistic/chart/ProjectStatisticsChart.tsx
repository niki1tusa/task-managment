'use client';

import { useState } from 'react';

import { MonthlyData, yearlyData } from '../../../../shared/data/project-chart.data';
import type { ITimeRange } from '../../../../shared/types/project-chart.types';

import { ProjectChart } from './ProjectChart';
import { ProjectChartHeader } from './header/ProjectChartHeader';

export function ProjectStatisticsChart() {
	const [selectedRange, setSelectedRange] = useState<ITimeRange>({
		label: 'Yearly',
		value: 'yearly',
	});
	const currentData = selectedRange.value === 'yearly' ? yearlyData : MonthlyData;
	return (
		<div className='text-foreground rounded-2xl border border-white shadow shadow-neutral-500 dark:border-none'>
			<ProjectChartHeader onChangeRange={setSelectedRange} selectedRange={selectedRange} />
			<ProjectChart data={currentData} />
		</div>
	);
}
