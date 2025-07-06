import type { ICard } from '@/shared/types/card.types';
import Image from 'next/image';


export const Card = ({ img, count, title, color }: ICard) => {
	return (
		<div
			className={`border border-white dark:border-none rounded-2xl shadow shadow-neutral-400 flex justify-around text-dark dark:text-white dark:bg-dark px-2 py-7 ${color}`}
		>
			<div>
				<div className='text-3xl font-semibold'>{count}</div>
				<div className='text-sm'>{title}</div>
			</div>
			<Image src={img} alt='picture' width={60} height={80} />
		</div>
	);
};
