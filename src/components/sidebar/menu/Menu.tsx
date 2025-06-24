import { Heading } from './Heading';
import { MenuItem } from './MenuItem';
import type { IMenuItem } from '@/types/menu.item.interface';


interface Props {
	heading: string;
	menus: IMenuItem[];
	isBorderTop?: boolean;
}

export const Menu = ({ heading, menus, isBorderTop = false }: Props) => {
	return (
		<nav className='flex flex-col gap-4'>
			{isBorderTop && <span className='h-[1px] w-[80%] block bg-gray/50 mt-8' />}
			<Heading heading={heading}/>
			{menus &&
				menus.map(menu => (
					<MenuItem key={menu.title} title={menu.title} color={menu.color} Icon={menu.Icon} />
				))}
		</nav>
	);
};
