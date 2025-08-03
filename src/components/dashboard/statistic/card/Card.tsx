import Image from 'next/image';

import type { ICard } from '@/shared/types/card.types';

export const Card = ({ img, count, title, color }: ICard) => {
	return (
		<div
			className={`text-dark dark:bg-dark flex justify-around rounded-2xl border border-white px-2 py-7 shadow shadow-neutral-400 dark:border-none dark:text-white ${color}`}
		>
			<div>
				<div className='text-3xl font-semibold'>{count}</div>
				<div className='text-sm'>{title}</div>
			</div>
			<Image src={img} alt='picture' width={60} height={80} />
		</div>
	);
};
