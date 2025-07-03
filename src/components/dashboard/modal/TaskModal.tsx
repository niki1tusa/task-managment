'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
	children: React.ReactNode
}
export default function TaskModal({ children }: Props) {
	const router = useRouter();
	const closeModal = () => router.back();
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []);
	return (
		<div
			onClick={closeModal}
			className='fixed inset-0 z-50 items-center  justify-center bg-black/50 text-black'
		>
			<div
				onClick={e => e.stopPropagation()}
				className='з-6 mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg'
			>
				<div className='bg-background m-6 flex items-center justify-between'>
					{children}
					<button onClick={closeModal}>x</button>
				</div>
			</div>
		</div>
	);
}
