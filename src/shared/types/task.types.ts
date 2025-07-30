import type { IconName } from '@/shared/data/icon.data';

import type { IProfile } from './profile.types';

export interface ISubTask {
	id: string;
	title: string;
	is_completed: boolean;
}

export interface ITask {
	id: string;
	owner_id?: string;
	
	title: string;
	icon: IconName;
	color?: string;
	is_completed: boolean;
	users: IProfile[];
	due_date: string;
	start_time: string;
	end_time: string;
	sub_task: ISubTask[];

	comment?: number;
	img?: number;
	link?: number;
}
