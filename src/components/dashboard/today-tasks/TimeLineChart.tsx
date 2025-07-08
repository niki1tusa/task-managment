'use client';

import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import { useTaskStore } from '@/store/store';

const data = [
	{ date: '2025-07-01', value: 1 },
	{ date: '2025-07-02', value: 2 },
	{ date: '2025-07-03', value: 3 },
	{ date: '2025-07-07', value: 3 },
	{ date: '2025-07-09', value: 3 },
];

export default function TimelineChart() {
	const tasks = useTaskStore(state => state.tasks);
	return (
		<ResponsiveContainer width='100%' height={300}>
			<AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
				<defs>
					<linearGradient id='colorGradient' x1='0' y1='0' x2='0' y2='1'>
						<stop offset='5%' stopColor='#725BF2' stopOpacity={0.3} />
						<stop offset='95%' stopColor='#725BF2' stopOpacity={0} />
					</linearGradient>
				</defs>
				<CartesianGrid strokeDasharray='0' vertical={false} stroke='#F3F4F6' />
				<XAxis
					dataKey='period'
					axisLine={false}
					tickLine={false}
					tick={{ fontSize: 12, fill: '#9CA3AF' }}
				/>
				<YAxis
					dataKey='value'
					axisLine={false}
					tickLine={false}
					tick={{ fontSize: 12, fill: '#9CA3AF' }}
					domain={[0, 'dataMax + 10']}
				/>

				<Area
					type='monotone'
					dataKey='value'
					stroke='#6366F1'
					strokeWidth={2}
					fillOpacity={1}
					fill='url(#colorGradient)'
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
