import Link from 'next/link';

import { PAGE } from '@/config/dashboardDASHBOARD_PAGEconfig';

export function TaskBtnAction({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			className='bg-primary flex h-9 w-9 items-center justify-center rounded-full text-white shadow shadow-neutral-400'
		>
			{children}
		</Link>
	);
}
