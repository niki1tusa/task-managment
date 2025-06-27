'use client';

import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

// Регистрация компонентов Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Параметры по умолчанию
const defaultOptions = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
	},

	scales: {
		x: {
			grid: {
				display: false,
			},
		},
	},
};
const defaultLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const defaultData = {
	labels: defaultLabels,
	datasets: [
		{
			data: [0, 10, 30, 10, 30, 5],
        fill: true,
        backgroundColor: "rgba(205, 255, 255, 0.3)",
        borderColor: "rgba(255, 255, 255, 0.3)",
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
		},
	],
};

// Переиспользуемый компонент
export function LineChart({
	data = defaultData,
	options = defaultOptions,
}: {
	data?: any;
	options?: any;
}) {
	return <Line options={options} data={data} />;
}

// Обёртка с фильтром
export const Chart = () => {
	const [filter, setFilter] = useState<'Month' | 'Year'>('Month');

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value as 'Month' | 'Year';
		setFilter(value);
	};

	return (
		<div className='bg-blue-400 rounded-2xl shadow p-6'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-lg font-semibold'>Project Statistic</h2>
				<select
					className='border rounded px-2 py-1 text-sm'
					value={filter}
					onChange={handleFilterChange}
				>
					<option value='Year'>Yearly</option>
					<option value='Month'>Monthly</option>
				</select>
			</div>
			<LineChart />
		</div>
	);
};
