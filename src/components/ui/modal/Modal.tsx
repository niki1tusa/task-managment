'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { SquareX } from 'lucide-react';

import { useClickOutside } from '@/hooks/useClickOutside';

import { WrapperModal } from './WrapperModal';

interface Props {
	title: string;
	close: () => void;
	children: React.ReactNode;
}
export default function Modal({ title, children, close }: Props) {
	const { ref } = useClickOutside<HTMLDivElement>(() => close());
	return (
		<AnimatePresence>
			<WrapperModal>
				<motion.div
					initial={{ scale: 0.4, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.6 }}
					ref={ref}
					className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg shadow-neutral-400'
				>
					<div className='mb-6 flex items-center justify-between'>
						<h1 className='text-xl font-medium'>{title}</h1>
						<button type='button' onClick={close} className='hover:text-red-600'>
							<SquareX />
						</button>
					</div>
					<div className='flex gap-3'>{children}</div>
				</motion.div>
			</WrapperModal>
		</AnimatePresence>
	);
}
