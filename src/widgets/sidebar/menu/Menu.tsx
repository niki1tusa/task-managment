'use client';

import { Title } from '@/shared/ui/Title';

import { MenuItem } from './MenuItem';
import type { IMenuItem } from '@/widgets/sidebar/menu-item-types';

interface Props {
	heading: string;
	menu: IMenuItem[];
	isBorderTop?: boolean;
}

export const Menu = ({ heading, menu, isBorderTop = false }: Props) => {
	return (
		<nav className='flex w-full flex-col gap-4'>
			{isBorderTop && <span className='border-gray/30 mt-4 block w-[80%] border-b-2' />}
			<Title isMenuTitle={true}>{heading}</Title>
			{menu.length && menu.map((item, i) => <MenuItem key={`${item.title}-${i}`} item={item} />)}
		</nav>
	);
};
