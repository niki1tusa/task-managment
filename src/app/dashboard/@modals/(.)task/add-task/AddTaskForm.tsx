'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Form from '@/components/ui/form/Form';

import type { TSubTaskRowForm } from '@/shared/types/form/scheme.zod';
import type { TTaskCreateForm } from '@/shared/types/task/task.types';

import Header from '../../../../../components/dashboard/modals/Header.modal';
import { WrapperModal } from '../../../../../components/dashboard/modals/Wrapper.modal';
import { TASK_EDIT_FIELDS } from '../[id]/edit-task/task.edit.data';

import { createClientSubTask, createClientTask } from '@/services/tasks/task-client.service';

export const AddTaskForm = () => {
	const router = useRouter();
// TODO: Subtask не добавляется при создании task
	const { mutate } = useMutation({
		mutationKey: ['add-task'],
		mutationFn: (payload: TTaskCreateForm) => createClientTask(payload),
		onSuccess: (createTask) => {
			console.log('Created task:', createTask);
			toast.success('Task is success created!');
			if (createTask && createTask.id) {
				mutateSubTask({ id: createTask.id, payload: { title: 'Example subtask' } });
			}
			closeModal();
		},
		onError: () => {
			toast.error('Mutation error, task is failed!');
		},
	});
	const { mutate: mutateSubTask } = useMutation({
		mutationKey: ['add-subtask'],
		mutationFn: ({ id, payload }: { id: string; payload: TSubTaskRowForm }) =>
			createClientSubTask(id, payload),
		onError: () => {
			toast.error('Mutation error, subtask is failed!');
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
	};
	return (
		<WrapperModal closeModal={closeModal}>
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<Header title={`Add task `} closeModal={closeModal} />
				<Form<TTaskCreateForm>
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
