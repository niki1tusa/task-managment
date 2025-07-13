'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Form from '@/components/ui/Form';

import { ZTaskScheme } from '../../../../shared/types/scheme.zod';
import { WrapperModal } from '../Wrapper.modal';
import Header from '../header-modals/Header';

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
				<Form
					btnText='Save'
					isIconField={true}
					isTitleField={true}
					zodScheme={ZTaskScheme}
					closeModal={closeModal}
					isEditTask={true}
					isDataField={true}
				/>{' '}
			</div>
		</WrapperModal>
	);
}
