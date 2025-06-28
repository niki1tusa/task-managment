import type { LucideIcon } from "lucide-react";
import type { IProfile } from "./profile.types";

export interface ITask {
	id: number;
	iconTheme: LucideIcon;
	title: string;
	users: IProfile[];
	deadline: string;
	status: number;
	comment: number;
	saveCount: number;
	link: number;
}