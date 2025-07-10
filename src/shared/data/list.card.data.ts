import type { ICard } from '@/shared/types/card.types';

export const LIST_CARD: ICard[] = [
	{
		id: '1',
		img: '/dashboard/active-projects.svg',
		count: '92',
		title: 'Active Project',
		color: 'bg-primary/80',
	},
	{
		id: '2',
		img: '/dashboard/ongoing-projects.svg',
		count: '35',
		title: 'On Going Project',
		color: 'bg-yellow/80',
	},
	{
		id: '3',
		img: '/dashboard/working-hours.svg',
		count: '19h 09m',
		title: 'Working hours',
		color: 'bg-pink/80',
	},
];
