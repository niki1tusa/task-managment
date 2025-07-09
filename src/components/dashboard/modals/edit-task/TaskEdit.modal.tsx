'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import Form from '@/components/ui/Form';

import Header from '../header-modals/Header';
import { ZTaskScheme } from '../scheme.zod';

interface Props {
	id: string;
}
export default function TaskModal({ id }: Props) {
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
		<>
			<div onClick={closeModal} className='bg-opacity-50 bg-background/90 fixed inset-0 z-40' />
			<ToastContainer />
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<Header title={`Edit task "${id}"`} closeModal={closeModal} />

				<Form
					id={id}
					btnText='Save'
					isIcon={true}
					isTitleField={true}
					zodScheme={ZTaskScheme}
					closeModal={closeModal}
					isUpdateTask={true}
					isDataField={true}
				/>
			</div>
		</>
	);
}
