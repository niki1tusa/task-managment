import type { LucideIcon } from 'lucide-react';

export interface IMenuItem {
	title: string;
	Icon?: LucideIcon;
	link: string;
	color?: string;
}
