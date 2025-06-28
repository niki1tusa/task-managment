import { cards } from '../../data/card.data';

import { Card } from './card/Card';
import { Chart } from './chart/Chart';

export const Statistic = () => {
	return (
		<div className='mt-10 grid grid-cols-[30%_70%] gap-5 '>
			<div className=' flex flex-col gap-3'>
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
			<Chart />
		</div>
	);
};
