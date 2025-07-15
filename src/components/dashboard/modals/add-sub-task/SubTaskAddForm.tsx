'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Form from '@/components/ui/form/Form';

import { ZSubTaskScheme } from '../../../../shared/types/scheme.zod';
import Header from '../component/Header.modal';
import { WrapperModal } from '../component/Wrapper.modal';
import { SUB_TASK_ADD_FIELDS } from './subtask.add.data';

interface Props {
	id: string;
}

export default function SubTaskAddForm({ id }: Props) {
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
				<Header title={`Add Subtask "${id}"`} closeModal={closeModal} />
				<Form
					btnText='Save'
					handleOnSubmit={}
					formElement={SUB_TASK_ADD_FIELDS}
				/>
			</div>
		</WrapperModal>
	);
}
