'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { IMenuItem } from '@/shared/types/menu.item.types';

export const MenuItem = ({ item }: { item: IMenuItem }) => {
	const pathname = usePathname();
	const activeLink = pathname === item.link;
	return (
		<Link
			href={item.link}
			className='flex items-center rounded-4xl gap-1.5 font-semibold text-sm transition-colors px-3 py-1 text-gray  hover:bg-primary hover:text-white'
		>
			{item.Icon && <item.Icon />}
			{item.color && <div className={`w-3 h-3  ${item.color}`} />}
			{activeLink ? (
				<div className='border-b-2 text-foreground font-bold'>{item.title}</div>
			) : (
				<div>{item.title}</div>
			)}
		</Link>
	);
};
