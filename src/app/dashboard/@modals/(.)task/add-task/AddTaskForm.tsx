'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Form from '@/components/ui/form/Form';

import type { TTaskCreateForm } from '@/shared/types/task/task.types';

import Header from '../../../../../components/dashboard/modals/Header.modal';
import { WrapperModal } from '../../../../../components/dashboard/modals/Wrapper.modal';
import { TASK_EDIT_FIELDS } from '../[id]/edit-task/task.edit.data';

import { createClientTask } from '@/services/tasks/task-client.service';

export const AddTaskForm = () => {
	const router = useRouter();
	const { mutate } = useMutation({
		mutationKey: ['task'],
		mutationFn: (payload: TTaskCreateForm) => createClientTask(payload),
		onSuccess: () => {
			toast.success('Task is success created!');
		},
		onError: () => {
			toast.error('Mutation error, task is failed!');
		},
	});
	const {
		setValue,
		control,
		watch,
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TTaskCreateForm>();
	const closeModal = () => router.back();
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [closeModal]);
	const onSubmit: SubmitHandler<TTaskCreateForm> = data => {
		mutate(data);
		closeModal();
	};
	return (
		<WrapperModal closeModal={closeModal}>
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<Header title={`Add task `} closeModal={closeModal} />
				<Form
					setValue={setValue}
					watch={watch}
					control={control}
					handleOnSubmit={handleSubmit(onSubmit)}
					register={register}
					errors={errors}
					formElement={TASK_EDIT_FIELDS}
					btnText='Save'
				/>
			</div>
		</WrapperModal>
	);
};
