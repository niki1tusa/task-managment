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
					'text-gray flex items-center gap-2  rounded-sm px-3 py-1 text-sm transition-colors duration-300',
					activeLink
						? 'bg-primary text-white dark:border-2 dark:bg-transparent '
						: 'hover:text-primary dark:hover:text-white'
				)}
			>
					<item.Icon size={22}/>
				<div className='font-medium transition-colors'>{item.title}</div>
			</Link>
		</AnimateIcon>
	);
};
