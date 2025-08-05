'use client';

import { Title } from '@/components/ui/Title';

import type { IMenuItem } from '@/shared/types/sidebar/menu.item.types';

import { MenuItem } from './MenuItem';

interface Props {
	heading: string;
	menu: IMenuItem[];
	isBorderTop?: boolean;
}

export const Menu = ({ heading, menu, isBorderTop = false }: Props) => {
	return (
		<nav className='flex w-full flex-col gap-4'>
			{isBorderTop && <span className='border-gray/30 mt-4 block w-[80%] border-b-2 2xl:mt-8' />}
			<Title isMenuTitle={true}>{heading}</Title>
			{menu.length && menu.map((item, i) => <MenuItem key={`${item.title}-${i}`} item={item} />)}
		</nav>
	);
};
