import type { LucideIcon } from "lucide-react";

export interface ITask {
	id: number;
	iconTheme: LucideIcon;
	title: string;
	deadline: string;
	status: number;
	comment: number;
	saveCount: number;
	link: number;
}