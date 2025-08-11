'use client';

import { SquareX } from 'lucide-react';

import { Button } from '@/components/ui/Button';

import { useClickOutside } from '@/hooks/useClickOutside';

import { WrapperModal } from './wrapper.modal';

interface Props {
	title: string;
	close: () => void;
	children: React.ReactNode;
}
export default function Modal({ title, children, close }: Props) {
	const { ref } = useClickOutside<HTMLDivElement>(() => close());
	return (
		<WrapperModal>
			<div
				ref={ref}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<div className='mb-6 flex items-center justify-between'>
					<h1 className='text-xl font-medium'>{title}</h1>
					<Button onClick={close} className='hover:text-red-600'>
						<SquareX />
					</Button>
				</div>
				<div className='flex gap-3'>{children}</div>
			</div>
		</WrapperModal>
	);
}
