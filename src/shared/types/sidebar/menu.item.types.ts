import type { LucideIcon } from 'lucide-react';

export type MenuIcon =
	| React.ComponentType<React.SVGProps<SVGSVGElement>>
	| LucideIcon
	| React.ComponentType<any>;
	
export interface IMenuItem {
	title: string;
	Icon: MenuIcon;
	link: string;
	color?: string;
}
export interface IProjectsMenu {
	title: string;
	color: string;
}
