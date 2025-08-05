'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { IMenuItem } from '@/shared/types/sidebar/menu.item.types';

export const MenuItem = ({ item }: { item: IMenuItem }) => {
	const pathname = usePathname();
	const activeLink = pathname === item.link;
	return (
		<Link
			href={item.link}
			className='text-gray hover:bg-primary flex items-center gap-1.5 rounded-4xl px-3 py-1 text-sm font-semibold transition-colors duration-300 hover:text-white 2xl:text-lg'
		>
			{item.Icon && <item.Icon />}
			{item.color && <div className={`h-3 w-3 ${item.color}`} />}
			{}{' '}
			{activeLink ? (
				<div className='text-foreground/50 border-b-2 font-bold transition-colors hover:text-white'>
					{item.title}
				</div>
			) : (
				<div>{item.title}</div>
			)}
		</Link>
	);
};
