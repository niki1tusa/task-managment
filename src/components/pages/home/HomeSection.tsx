'use client';

import { motion } from 'framer-motion';

export function HomeSection({ text1, text2 }: { text1: string; text2: string }) {
	return (
		<motion.div
			initial={{
				y: 0,
				boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
			}}
			whileHover={{
				y: -10,
				boxShadow: '0px 12px 25px rgba(0,0,0,0.2)',
			}}
			whileTap={{
				scale: 0.98,
				y: -2,
				transition: {
					type: 'spring',
					stiffness: 600,
					damping: 30,
				},
			}}
			className='bg-muted mt-10 relative overflow-hidden rounded-xl p-6 shadow-sm'
		>
			<div className='relative z-10'>
				<h3 className='mb-2 text-lg font-semibold'>{text1}</h3>
				<p className='text-muted-foreground text-sm'>{text2}</p>
			</div>
		</motion.div>
	);
}
