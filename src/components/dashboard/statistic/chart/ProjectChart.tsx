import { useMemo } from 'react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';


import { ProjectChartToolTip } from './tool-tip/ProjectChartToolTip';
import type { TGetChartPointResponse } from '@/shared/types/statistics/statistics.types';

interface Props {
	data: TGetChartPointResponse;
}

export const ProjectChart = ({ data }: Props) => {
	const maxData = useMemo(() => {
		let maxValue = 0;
		let maxPeriod = '';
		data.forEach(item => {
			if (item.value > maxValue) {
				maxValue = item.value;
				maxPeriod = item.period;
			}
		});
		return { value: maxValue, period: maxPeriod };
	}, [data]);
	return (
		<ResponsiveContainer width='100%' height={300} >
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
				<Tooltip content={<ProjectChartToolTip />} cursor={false} />
				{maxData && (
					<ReferenceLine
						x={maxData.period}
						stroke='#6366F1'
						strokeWidth={1.5}
						strokeDasharray='5 5'
					/>
				)}
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
};
