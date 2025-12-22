import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function LinkComponent({
	children,
	path,
	className,
}: {
	children: ReactNode;
	path: string;
	className?: string;
}) {
	return (
		<Link
			href={path}
			className={clsx(
				'dark:hover:bg-gray/15 shadow-default rounded-md bg-white px-6 py-1 transition-colors hover:bg-gray-200/50 dark:bg-[#030307]',
				className
			)}
		>
			{children}
		</Link>
	);
}
