import { CalendarDays, ClipboardMinus, UsersRound } from 'lucide-react';

import { Bell } from '@/components/animate-ui/icons/bell';
import { Kanban } from '@/components/animate-ui/icons/kanban';
import { LayoutDashboard } from '@/components/animate-ui/icons/layout-dashboard';
import { MessageCircleMoreIcon } from '@/components/animate-ui/icons/message-circle-more';
import { SettingsIcon } from '@/components/animate-ui/icons/settings';
import { DASHBOARD_PAGES } from '@/components/ui/config/dashboard-page.config';

import type { IMenuItem } from '@/shared/types/sidebar/menu.item.types';

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
		title: 'Notification',
		Icon: Bell as React.ComponentType<React.SVGProps<SVGSVGElement>>,
		link: DASHBOARD_PAGES.NOTIFICATION,
	},
	{
		title: 'Schedule',
		Icon: CalendarDays,
		link: DASHBOARD_PAGES.SCHEDULE,
	},
	// {
	// 	title: 'Insight',
	// 	Icon: Kanban as React.ComponentType<React.SVGProps<SVGSVGElement>>,
	// 	link: DASHBOARD_PAGES.INSIGHT,
	// },
	{
		title: 'Team',
		Icon: UsersRound,
		link: DASHBOARD_PAGES.TEAM,
	},
	{
		title: 'Settings',
		Icon: SettingsIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
		link: DASHBOARD_PAGES.SETTINGS,
	},
];
