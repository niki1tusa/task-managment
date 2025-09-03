'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
	img: string | null;
	isHoverResolution?: boolean;
	isPartySide?: boolean;
}

export function Avatar({ img, isHoverResolution, isPartySide }: Props) {
	return isHoverResolution ? (
		<motion.div
			initial={{ y: 0 }}
			whileHover={{ y: -3 }}
			className='bg-primary flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border shadow shadow-neutral-400'
		>
			<Image
				src={img || '/avatar-fallback.png'}
				alt='user'
				width={36}
				height={36}
				className='shrink-0'
				priority
			/>
		</motion.div>
	) : isPartySide ? (
		<div className='bg-primary flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border shadow shadow-neutral-400'>
			<Image
				src={img || '/avatar-fallback.png'}
				alt='user'
				width={24}
				height={24}
				className='shrink-0'
				priority
			/>
		</div>
	) : (
		<div className='bg-primary flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border shadow shadow-neutral-400'>
			<Image
				src={img || '/avatar-fallback.png'}
				alt='user'
				width={32}
				height={32}
				className='shrink-0'
				priority
			/>
		</div>
	);
}
