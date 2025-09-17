'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AnimateIcon } from '@/components/animate-ui/icons/icon';

import type { IMenuItem } from '@/shared/types/sidebar/menu.item.types';

import { useNotices } from '@/hooks/useNotices';

export const MenuItem = ({ item }: { item: IMenuItem }) => {
	const pathname = usePathname();
	const activeLink = pathname === item.link;
	const { notices } = useNotices();
	const notReadNotice = notices?.filter(notice => notice.status === false) || [];
	return (
		<AnimateIcon animateOnHover>
			<Link
				href={item.link}
				className={clsx(
					'text-gray relative flex items-center rounded-sm px-3 py-1 text-sm transition-colors duration-300',
					activeLink
						? 'bg-primary text-white dark:border-2 dark:bg-transparent'
						: 'hover:text-primary dark:hover:text-white',
					item.title === 'Notification' && ''
				)}
			>
				<div className='flex items-center gap-2'>
					<div className='relative'>
						<item.Icon size={22} />
						{item.title === 'Notification' && !activeLink && notReadNotice?.length > 0 && (
							<div className='absolute top-0 left-[50%] flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-sm text-white'></div>
						)}
					</div>
					<div className='font-medium transition-colors'>{item.title}</div>
				</div>
			</Link>
		</AnimateIcon>
	);
};
