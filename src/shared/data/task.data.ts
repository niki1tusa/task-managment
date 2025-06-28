import { Bug, LaptopMinimalCheck, Plane } from 'lucide-react';

import { PROFILES } from './profile.data';
import type { ITask } from '@/shared/types/task.types';

export const TASKS: ITask[] = [
	{
		id: 1,
		iconTheme: Plane,
		title: 'Travel App User Flow',
		deadline: '5 days',
		users: PROFILES,
		status: 30,
		comment: 1,
		saveCount: 2,
		link: 2,
	},
	{
		id: 2,
		iconTheme: LaptopMinimalCheck,
		title: 'Create next app',
		deadline: '0 days',
		users: PROFILES,
		status: 100,
		comment: 3,
		saveCount: 5,
		link: 2,
	},
	{
		id: 3,
		iconTheme: Bug,
		title: 'Debuging AI system searh.',
		deadline: '5 days',
		users: PROFILES,
		status: 74,
		comment: 10,
		saveCount: 1,
		link: 1,
	},
];
