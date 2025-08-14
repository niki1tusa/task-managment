'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Avatar({ img, isHoverResolution }: { img: string; isHoverResolution?: boolean }) {
	return isHoverResolution ? (
		<motion.div
			initial={{ y: 0 }}
			whileHover={{ y: -3 }}
			className='bg-primary flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border shadow shadow-neutral-400'
		>
			{img && <Image src={img} alt='user' width={36} height={36} className='shrink-0' priority />}
		</motion.div>
	) : (
		<div className='bg-primary flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border shadow shadow-neutral-400'>
			{img && <Image src={img} alt='user' width={32} height={32} className='shrink-0 w-8 h-8' priority />}
		</div>
	);
}
