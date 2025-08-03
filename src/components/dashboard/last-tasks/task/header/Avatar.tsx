import Image from 'next/image';

export function Avatar({ img }: { img: string }) {
	return (
		<div className='bg-primary flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border shadow shadow-neutral-400'>
			{img && <Image src={img} alt='user' width={36} height={36} className='shrink-0' priority />}
		</div>
	);
}
