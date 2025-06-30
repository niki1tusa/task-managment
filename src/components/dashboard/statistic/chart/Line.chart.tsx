'use client';

import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	// Добавляем Filler для заливки области
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Ticks,
	Title,
	Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { monthlyData } from '@/shared/data/chart.data';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

// Параметры по умолчанию
const options = {
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
			ticks: {
				color: '#fff',
				font: {
					size: 14,
					weight: 500,
				},
			},
			grid: {
				display: false,
			},
			border: {
				display: false,
			},
		},
		y: {
			ticks: {
				color: '#fff',
				font: {
					size: 14,
					weight: 500,
				},
			},
			grid: {
				display: false,
			},
			border: {
				display: false,
			},
		},
	},
};

// Данные для месячного отображения

// Переиспользуемый компонент
export function LineChart({ data = monthlyData, option = options }: { data?: any; option?: any }) {
	return <Line options={option} data={data} />;
}
