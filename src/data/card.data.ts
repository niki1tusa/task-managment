import active from '../../../../public/dashboard/active-projects.svg';
import going from '../../../../public/dashboard/ongoing-projects.svg';
import working from '../../../../public/dashboard/working-hours.svg';
import type { ICard } from '../components/statistic/card/card.types';

export const cards: ICard[] = [
	{
		id: '1',
		img: active,
		count: '92',
		title: 'Active Project',
		color: 'bg-blueviolet',
	},
	{
		id: '2',
		img: going,
		count: '35',
		title: 'On Going Project',
		color: 'bg-yellow',
	},
	{
		id: '3',
		img: working,
		count: '19h 09m',
		title: 'Working hours',
		color: 'bg-pink',
	},
];
