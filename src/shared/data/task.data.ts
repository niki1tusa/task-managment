import { Bug, LaptopMinimalCheck, Plane } from 'lucide-react';

import type { ITask } from '@/shared/types/task.types';

import { PROFILES } from './profile.data';

export const TASKS: ITask[] = [
	{
		id: 1,
		iconTheme: Plane,
		title: 'Travel App User Flow',
		due: 5,
		users: PROFILES,
		isCompleted: false,
		subTask: [
			{ id: 1, title: 'fix component', isCompleted: false },
			{ id: 2, title: 'fix component', isCompleted: false },
			{ id: 3, title: 'fix component', isCompleted: true },
		],
		comment: 1,
		img: 2,
		link: 2,
	},
	{
		id: 2,
		iconTheme: LaptopMinimalCheck,
		title: 'Create next app',
		due: 0,
		users: PROFILES,
		isCompleted: true,
		subTask: [
			{ id: 1, title: 'fix component', isCompleted: true },
			{ id: 2, title: 'fix component', isCompleted: true },
			{ id: 3, title: 'fix component', isCompleted: true },
		],
		comment: 3,
		img: 5,
		link: 2,
	},
	{
		id: 3,
		iconTheme: Bug,
		title: 'Debuging AI system searh.',
		due: 5,
		users: PROFILES,
		isCompleted: false,
		subTask: [
			{ id: 1, title: 'fix component', isCompleted: false },
			{ id: 2, title: 'fix component', isCompleted: true },
			{ id: 3, title: 'fix component', isCompleted: true },
			{ id: 4, title: 'fix component', isCompleted: true },
		],
		comment: 10,
		img: 1,
		link: 1,
	},
];
