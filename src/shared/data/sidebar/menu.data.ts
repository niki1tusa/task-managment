

import { LayoutDashboard } from '@/components/animate-ui/icons/layout-dashboard';
import {
	CalendarDays,
	ClipboardMinus,
	UsersRound,
} from 'lucide-react';
import type { IMenuItem } from '@/shared/types/sidebar/menu.item.types';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';
import { SettingsIcon } from '@/components/animate-ui/icons/settings';
import { MessageCircleMoreIcon } from '@/components/animate-ui/icons/message-circle-more';
import { Kanban } from '@/components/animate-ui/icons/kanban';

export const MENU: IMenuItem[] = [
	{
		title: 'Dashboard',
		Icon: LayoutDashboard as React.ComponentType<React.SVGProps<SVGSVGElement>>,
		link: DASHBOARD_PAGES.DASHBOARD,
	},
	{
		title: 'Message',
		Icon: MessageCircleMoreIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
		link: DASHBOARD_PAGES.MESSAGES,
	},
	{
		title: 'Insight',
		Icon: Kanban as React.ComponentType<React.SVGProps<SVGSVGElement>>,
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
		Icon: SettingsIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
		link: DASHBOARD_PAGES.SETTINGS,
	},
];
