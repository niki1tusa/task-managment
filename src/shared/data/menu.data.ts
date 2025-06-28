import {
	CalendarDays,
	ChartColumnDecreasing,
	ClipboardMinus,
	LayoutGrid,
	MessageCircleMore,
	Settings,
	UsersRound,
} from 'lucide-react';

import {PAGE }from '@/config/page.config';

import type { IMenuItem } from '@/shared/types/menu.item.types';

export const MENU: IMenuItem[] = [
	{
		title: 'Dashboard',
		Icon: LayoutGrid,
		link: PAGE.DASHBOARD,
	},
	{
		title: 'Message',
		Icon: MessageCircleMore,
		link: PAGE.MESSAGES,
	},
	{
		title: 'Insight',
		Icon: ChartColumnDecreasing,
		link: PAGE.INSIGHT,
	},
	{
		title: 'Team',
		Icon: UsersRound,
		link: PAGE.TEAM,
	},
	{
		title: 'Shedule',
		Icon: CalendarDays,
		link: PAGE.SCHEDULE,
	},
	{
		title: 'Report',
		Icon: ClipboardMinus,
		link: PAGE.REPORT,
	},
	{
		title: 'Settings',
		Icon: Settings,
		link: PAGE.SETTINGS,
	},
];
