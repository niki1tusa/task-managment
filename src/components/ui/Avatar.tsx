'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Avatar({ img, isHoverResolution }: { img: string | null; isHoverResolution?: boolean }) {
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
	) : (
		<div className='bg-primary flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border shadow shadow-neutral-400'>
			<Image
				src={img || '/avatar-fallback.png'}
				alt='user'
				width={32}
				height={32}
				className='h-8 w-8 shrink-0'
				priority
			/>
		</div>
	);
}
