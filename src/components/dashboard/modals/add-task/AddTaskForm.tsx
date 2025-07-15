'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Form from '@/components/ui/form/Form';

import Header from '../component/Header.modal';
import { WrapperModal } from '../component/Wrapper.modal';

export default function TaskAddModalComponent() {
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
		<WrapperModal closeModal={closeModal}>
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<Header title={`Add task `} closeModal={closeModal} />
				<Form formElement={} btnText='Save'   />
			</div>
		</WrapperModal>
	);
}
