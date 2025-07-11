import { Card } from './card/Card';
import { ProjectStatisticsChart } from './chart/ProjectStatisticsChart';
import { LIST_CARD } from '@/shared/data/list.card.data';

export const Statistic = () => {
	return (
		<div className=' grid grid-cols-1 lg:grid-cols-[30%_70%] gap-5'>
			<div className='flex flex-col gap-3'>
				{LIST_CARD.map(card => (
					<Card
						key={card.id}
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
