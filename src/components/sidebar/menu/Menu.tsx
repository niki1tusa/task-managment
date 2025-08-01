'use client';

import { Title } from '@/components/ui/Title';

import { MenuItem } from './MenuItem';
import type { IMenuItem } from '@/shared/types/menu.item.types';

interface Props {
	heading: string;
	menu: IMenuItem[];
	isBorderTop?: boolean;
}

export const Menu = ({ heading, menu, isBorderTop = false }: Props) => {
	return (
		<nav className='flex flex-col gap-4 w-full '>
			{isBorderTop && <span className='border-b-2 w-[80%] block border-gray/30 mt-8' />}
			<Title isMenuTitle={true}>{heading}</Title>
			{menu.length && menu.map(item => <MenuItem key={item.title} item={item} />)}
		</nav>
	);
};
