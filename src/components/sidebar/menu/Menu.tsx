'use client';

import { Heading } from '../../ui/Heading';

import { MenuItem } from './MenuItem';
import type { IMenuItem } from '@/types/menu.item.types';

interface Props {
	heading: string;
	menu: IMenuItem[];
	isBorderTop?: boolean;
}

export const Menu = ({ heading, menu, isBorderTop = false }: Props) => {
	console.log('menus:', menu);
	return (
		<nav className='flex flex-col gap-4'>
			{isBorderTop && <span className='h-[1px] w-[80%] block bg-gray/50 mt-8' />}
			<Heading heading={heading} />
			{menu.length && menu.map(item => <MenuItem key={item.title} item={item} />)}
		</nav>
	);
};
