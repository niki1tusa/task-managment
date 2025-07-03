import type { LucideIcon } from 'lucide-react';

import type { IProfile } from './profile.types';

export interface ISubTask {
	id: string;
	title: string;
	isCompleted: boolean;
}

export interface ITask {
	id: string;
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
