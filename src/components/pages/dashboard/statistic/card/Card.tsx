import clsx from 'clsx';
import Image from 'next/image';

import type { TGetProjectStatResponse } from '@/shared/types/statistics-types';

const bgColorMap = {
	primary: 'bg-primary/80 ',
	yellow: 'bg-yellow/80 ',
	pink: 'bg-pink/80 ',
};
export const Card = ({ icon, number, label, bg_color }: TGetProjectStatResponse[0]) => {
	const bgClass = bgColorMap[bg_color as keyof typeof bgColorMap] ?? 'bg-gray-200';
	return (
		<div
			className={clsx(
				`text-dark shadow-default dark:bg-side flex items-center justify-between rounded-2xl border border-white px-10 py-7 dark:border-none dark:text-white`,
				bgClass
			)}
		>
			<div>
				<div className='text-3xl font-semibold'>{number}</div>
				<div className='text-base'>{label}</div>
			</div>
			<Image src={icon || ''} alt='picture' width={60} height={60} />
		</div>
	);
};
