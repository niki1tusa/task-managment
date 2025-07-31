'use client';

import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Form from '@/components/ui/form/Form';

import { taskStore } from '@/store/task.store';

import Header from '../../../../../../components/dashboard/modals/Header.modal';
import { WrapperModal } from '../../../../../../components/dashboard/modals/Wrapper.modal';

import { SUB_TASK_ADD_FIELDS } from './subtask.add.data';

interface Props {
	id: string;
}

export const SubTaskAddForm = observer(({ id }: Props) => {
	const router = useRouter();
	const addSubTask = taskStore.addSubTask;
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
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
	const onSubmit = (data: any) => {
		addSubTask(id, data);
		toast.success('SubTask is success add!');
		closeModal();
	};
	return (
		<WrapperModal closeModal={closeModal}>
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<Header title={`Add Subtask "${id}"`} closeModal={closeModal} />
				<Form
					register={register}
					errors={errors}
					btnText='Save'
					handleOnSubmit={handleSubmit(onSubmit)}
					formElement={SUB_TASK_ADD_FIELDS}
				/>
			</div>
		</WrapperModal>
	);
});
