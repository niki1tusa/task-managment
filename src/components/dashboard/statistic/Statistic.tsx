import { Card } from './card/Card';
import { ProjectStatisticsChart } from './chart/ProjectStatisticsChart';
import { useTaskStore } from '@/store';

export const Statistic = () => {
	const { cards } = useTaskStore();
	return (
		<div className='grid grid-cols-1 gap-5 lg:grid-cols-[30%_70%]'>
			<div className='flex flex-col gap-3'>
				{cards.map(card => (
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
