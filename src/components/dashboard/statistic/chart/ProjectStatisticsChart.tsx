'use client'
import { useState } from 'react';

import { ProjectChartHeader } from './ProjectChartHeader';
import type { ITimeRange } from './project-chart.types';
import { ProjectChart } from './ProjectChart';
import { MonthlyData, yearlyData } from '../../../../shared/data/project-chart.data';

export function ProjectStatisticsChart() {
	const [selectedRange, setSelectedRange] = useState<ITimeRange>({
		label: 'Yearly',
		value: 'yearly',
	});
	const currentData = selectedRange.value ==='yearly'? yearlyData: MonthlyData;
	return (
		<div>
			<ProjectChartHeader onChangeRange={setSelectedRange} selectedRange={selectedRange} />
			<ProjectChart data={currentData}/>
		</div>
	);
}
