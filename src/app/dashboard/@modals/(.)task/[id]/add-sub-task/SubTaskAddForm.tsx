'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Form from '@/components/ui/form/Form';

import { type TSubTaskRowForm, ZSubTaskScheme } from '@/shared/types/form/scheme.zod';

import Header from '../../../../../../components/dashboard/modals/Header.modal';
import { WrapperModal } from '../../../../../../components/dashboard/modals/Wrapper.modal';

import { SUB_TASK_ADD_FIELDS } from './subtask.add.data';
import { createClientSubTask } from '@/services/tasks/task-client.service';

export const SubTaskAddForm = ({ id }: { id: string }) => {
	const router = useRouter();

	const { mutate, isPending } = useMutation({
		mutationKey: ['createSubTask', id],
		mutationFn: (payload: TSubTaskRowForm) => createClientSubTask(id, payload),
		onSuccess: () => {
			toast.success('Subtask is successfully created!');
		},
		onError: () => toast.error('There was a problem during the creation of the subtask!'),
	});
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TSubTaskRowForm>({ resolver: zodResolver(ZSubTaskScheme) });
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
	const onSubmit: SubmitHandler<TSubTaskRowForm> = data => {
		mutate(data);
		closeModal();
	};
	return (
		<WrapperModal closeModal={closeModal}>
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<Header title={`Add Subtask`} closeModal={closeModal} />
				<Form
					register={register}
					errors={errors}
					handleOnSubmit={handleSubmit(onSubmit)}
					formElement={SUB_TASK_ADD_FIELDS}
					isPending={isPending}
					btnText='Save'
				/>
			</div>
		</WrapperModal>
	);
};
