import type {
	TGetChartPointResponse,
	TGetProjectStatResponse,
} from '@/shared/types/statistics/statistics.types';

import { Card } from './card/Card';
import { ProjectStatisticsChart } from './chart/ProjectStatisticsChart';

export const Statistic = ({
	projectStats,
	chartPoints,
}: {
	projectStats: TGetProjectStatResponse;
	chartPoints: TGetChartPointResponse;
}) => {
	return (
		<div className='grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr]'>
			<div className='flex flex-col gap-3'>
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
