import { Card } from './card/Card';
import { cards } from './card/card.data';

export const Statistic = () => {
	return (
		<div className='mt-10'>
			<div className='w-1/3 flex flex-col gap-3'>
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
		</div>
	);
};
