import type { LucideIcon } from 'lucide-react';

import type { IProfile } from './profile.types';

export interface ISubTask {
	id: number;
	title: string;
	isCompleted: boolean;
}

export interface ITask {
	id: number;
	iconTheme: LucideIcon;
	title: string;
	isCompleted: boolean;
	users: IProfile[];
	due: number;
	subTask: ISubTask[];
	comment: number;
	img: number;
	link: number;
}
