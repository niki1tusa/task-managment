'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AnimateIcon } from '@/components/animate-ui/icons/icon';

import type { IMenuItem } from '@/shared/types/sidebar/menu.item.types';

export const MenuItem = ({ item }: { item: IMenuItem }) => {
	const pathname = usePathname();
	const activeLink = pathname === item.link;
	return (
		<AnimateIcon animateOnHover>
			<Link
				href={item.link}
				className={clsx(
					'text-gray flex items-center gap-1.5 rounded-sm px-3 py-1 text-sm font-semibold transition-colors duration-300  2xl:text-lg',
					activeLink  ? 'bg-primary dark:bg-transparent dark:border-2  text-white' : 'hover:text-primary'
				)}
			>
				<item.Icon />
				{item.color && <div className={`h-3 w-3 ${item.color}`} />}

				<div className=' font-bold transition-colors '>
					{item.title}
				</div>
			</Link>
		</AnimateIcon>
	);
};
