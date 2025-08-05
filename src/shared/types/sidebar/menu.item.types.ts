import type { LucideIcon } from "lucide-react";

export interface IMenuItem {
	title: string;
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon
	link: string;
	color?: string; 
}
export interface IProjectsMenu {
    title: string
    color: string
}