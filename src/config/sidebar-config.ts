import { CalendarDays, UsersRound } from 'lucide-react';

import { Bell } from '@/components/animate-ui/icons/bell';
import { LayoutDashboard } from '@/components/animate-ui/icons/layout-dashboard';
import { MessageCircleMoreIcon } from '@/components/animate-ui/icons/message-circle-more';
import { SettingsIcon } from '@/components/animate-ui/icons/settings';

import type { IMenuItem } from '@/shared/types/menu.item.types';

import { GUARD_PAGES } from '@/config/guard-page-config';

export const MENU: IMenuItem[] = [
	{
		title: 'Dashboard',
		Icon: LayoutDashboard as React.ComponentType<React.SVGProps<SVGSVGElement>>,
		link: GUARD_PAGES.DASHBOARD,
	},
	{
		title: 'Message',
		Icon: MessageCircleMoreIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
		link: GUARD_PAGES.MESSAGES,
	},
	{
		title: 'Notification',
		Icon: Bell as React.ComponentType<React.SVGProps<SVGSVGElement>>,
		link: GUARD_PAGES.NOTIFICATION,
	},
	{
		title: 'Schedule',
		Icon: CalendarDays,
		link: GUARD_PAGES.SCHEDULE,
	},
	// {
	// 	title: 'Insight',
	// 	Icon: Kanban as React.ComponentType<React.SVGProps<SVGSVGElement>>,
	// 	link: GUARD_PAGES.INSIGHT,
	// },
	{
		title: 'Team',
		Icon: UsersRound,
		link: GUARD_PAGES.TEAM,
	},
	{
		title: 'Settings',
		Icon: SettingsIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
		link: GUARD_PAGES.SETTINGS,
	},
];
