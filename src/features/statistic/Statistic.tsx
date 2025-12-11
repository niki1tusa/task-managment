import { Card } from './card/Card';
import { ProjectStatisticsChart } from './chart/ProjectStatisticsChart';
import type {
	TGetChartPointResponse,
	TGetProjectStatResponse,
} from '@/features/statistic/statistics-types';

export const Statistic = ({
	projectStats,
	chartPoints,
}: {
	projectStats: TGetProjectStatResponse;
	chartPoints: TGetChartPointResponse;
}) => {
	return (
		<div className='grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr]'>
			<div className='grid grid-cols-1 gap-3 2xl:grid-cols-2 2xl:grid-rows-2'>
				{projectStats.map(card => (
					<Card
						key={card.id}
						icon={card.icon}
						number={card.number}
						label={card.label}
						bg_color={card.bg_color}
					/>
				))}
			</div>
			<ProjectStatisticsChart chartPoints={chartPoints} />
		</div>
	);
};
