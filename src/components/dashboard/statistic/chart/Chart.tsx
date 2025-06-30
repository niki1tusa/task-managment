'use client';

import { useState } from 'react';


import { LineChart } from './Line.chart';
import { monthlyData, yearlyData } from '@/shared/data/chart.data';

export const Chart = () => {
	const [filter, setFilter] = useState<'Month' | 'Year'>('Month');

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as 'Month' | 'Year';
		setFilter(value);
	};
	const currentData = filter === 'Month' ? monthlyData : yearlyData
	return (
		<div className='bg-blue text-white rounded-2xl shadow shadow-neutral-500 p-6'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-semibold'>Project Statistic</h2>
				<select
					className='border bg-transparent rounded px-2 py-1 text-sm shadow shadow-neutral-600'
					value={filter}
					onChange={handleFilterChange}
				>
					<option className="bg-background" value='Month'>Monthly</option>
					<option className="bg-background" value='Year'>Yearly</option>
				</select>
			</div>
			<LineChart data={currentData} />
		</div>
	);
};
