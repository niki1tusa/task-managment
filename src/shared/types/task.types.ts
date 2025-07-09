import type { IconName } from '@/components/dashboard/modals/icon.data';

import type { IProfile } from './profile.types';

export interface ISubTask {
	id: string;
	title: string;
	isCompleted: boolean;
}
export interface IDue { 
	date: Date
	startTime?: Date
	endTime?: Date
}
export interface ITask {
	id: string;
	iconTheme: IconName;
	title: string;
	isCompleted: boolean;
	users: IProfile[];
	due: IDue
	subTask: ISubTask[];
	comment: number;
	img: number;
	link: number;
}

