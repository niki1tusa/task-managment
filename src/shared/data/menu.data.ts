import {
	CalendarDays,
	ChartColumnDecreasing,
	ClipboardMinus,
	LayoutGrid,
	MessageCircleMore,
	Settings,
	UsersRound,
} from 'lucide-react';

import type { IMenuItem } from '@/shared/types/menu.item.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

export const MENU: IMenuItem[] = [
	{
		title: 'Dashboard',
		Icon: LayoutGrid,
		link: DASHBOARD_PAGES.DASHBOARD,
	},
	{
		title: 'Message',
		Icon: MessageCircleMore,
		link: DASHBOARD_PAGES.MESSAGES,
	},
	{
		title: 'Insight',
		Icon: ChartColumnDecreasing,
		link: DASHBOARD_PAGES.INSIGHT,
	},
	{
		title: 'Team',
		Icon: UsersRound,
		link: DASHBOARD_PAGES.TEAM,
	},
	{
		title: 'Shedule',
		Icon: CalendarDays,
		link: DASHBOARD_PAGES.SCHEDULE,
	},
	{
		title: 'Report',
		Icon: ClipboardMinus,
		link: DASHBOARD_PAGES.REPORT,
	},
	{
		title: 'Settings',
		Icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
	},
];
