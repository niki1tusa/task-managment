import { Plane } from "lucide-react";
import type { ITask } from "./task.types";

export const tasks: ITask[] = [
	{
		id: 1,
		iconTheme: Plane,
		title: 'Travel App User Flow',
		deadline: '5 days',
		status: 30,
		comment: 3,
		saveCount: 5,
		link: 2,
	},
	{
		id: 2,
		iconTheme: Plane,
		title: 'Travel App User Flow',
		deadline: '0 days',
		status: 100,
		comment: 3,
		saveCount: 5,
		link: 2,
	},
	{
		id: 3,
		iconTheme: Plane,
		title: 'Travel App User Flow',
		deadline: '5 days',
		status: 74,
		comment: 3,
		saveCount: 5,
		link: 2,
	},
];
