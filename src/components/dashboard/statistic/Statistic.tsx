import { CARD } from '@/shared/data/list.card.data';

import { Card } from './card/Card';
import { ProjectStatisticsChart } from './chart/ProjectStatisticsChart';

export const Statistic = () => {
	const cards = CARD;
	return (
		<div className='grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr]'>
			<div className='flex flex-col gap-3'>
				{cards.map((card, i) => (
					<Card
						key={`${card.id}-${i}`}
						img={card.img}
						count={card.count}
						title={card.title}
						color={card.color}
					/>
				))}
			</div>
			<ProjectStatisticsChart />
		</div>
	);
};
