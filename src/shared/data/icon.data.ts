import { Bot, Bug, Hammer, type LucideIcon, Plane, TabletSmartphone } from 'lucide-react';

export const ICON_NAMES = ['Plane', 'Bug', 'Hammer', 'TabletSmartphone', 'Bot'] as const;
export type IconName = (typeof ICON_NAMES)[number];

export const MODAL_ICON: Record<IconName, LucideIcon> = {
	Plane,
	Bug,
	Hammer,
	TabletSmartphone,
	Bot,
};
