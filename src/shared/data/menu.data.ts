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

import { PAGE } from '@/config/dashboardDASHBOARD_PAGEconfig';

export const MENU: IMenuItem[] = [
	{
		title: 'Dashboard',
		Icon: LayoutGrid,
		link: DASHBOARD_PAGEDASHBOARD,
	},
	{
		title: 'Message',
		Icon: MessageCircleMore,
		link: DASHBOARD_PAGEMESSAGES,
	},
	{
		title: 'Insight',
		Icon: ChartColumnDecreasing,
		link: DASHBOARD_PAGEINSIGHT,
	},
	{
		title: 'Team',
		Icon: UsersRound,
		link: DASHBOARD_PAGETEAM,
	},
	{
		title: 'Shedule',
		Icon: CalendarDays,
		link: DASHBOARD_PAGESCHEDULE,
	},
	{
		title: 'Report',
		Icon: ClipboardMinus,
		link: DASHBOARD_PAGEREPORT,
	},
	{
		title: 'Settings',
		Icon: Settings,
		link: DASHBOARD_PAGESETTINGS,
	},
];
