import type { LucideIcon } from 'lucide-react';

// Базовые пропсы для SVG иконок
interface BaseSVGProps extends React.SVGProps<SVGSVGElement> {
	size?: number | string;
	color?: string;
	strokeWidth?: number | string;
}

// Пропсы для анимированных иконок (UI-animate)
interface AnimatedIconProps extends BaseSVGProps {
	animate?: boolean;
	duration?: number;
	delay?: number;
	variant?: string;
}

export type MenuIcon =
	| LucideIcon
	| React.ComponentType<BaseSVGProps>
	| React.ComponentType<AnimatedIconProps>
	| React.ComponentType<React.SVGProps<SVGSVGElement>>;

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