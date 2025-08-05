'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Header from '@/components/dashboard/modals/Header.modal';
import { WrapperModal } from '@/components/dashboard/modals/Wrapper.modal';

import type { MODAL_ICON } from '@/shared/data/icon.data';
import type { Database } from '@/shared/types/db/db.types';
import { type TFormData, ZTaskEditScheme } from '@/shared/types/form/scheme.zod';

import Form from '../../../../../../components/ui/form/Form';

import { TASK_EDIT_FIELDS } from './task.edit.data';
import { getClientTaskById, updateClientTask } from '@/services/tasks/task-client.service';

export const TaskEditForm = ({ id }: { id: string }) => {
	if (!id) return null;
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
	}, [closeModal]);

	// react-hook-form
	const {
		reset,
		handleSubmit,
		register,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm<TFormData>({
		resolver: zodResolver(ZTaskEditScheme),
	});
	// react query
	const { data, isSuccess } = useQuery({
		queryKey: ['task', id],
		queryFn: () => getClientTaskById(id),
		enabled: !!id,
	});
	useEffect(() => {
		if (!data) return;
		reset({
			title: data.title,
			due_date: new Date(data.due_date),
			icon: data.icon as keyof typeof MODAL_ICON,
		});
	}, [isSuccess]);

	// tanstack query

	const queryClient = useQueryClient();
	const { mutate, isPending, error } = useMutation({
		mutationKey: ['task', 'update', id],
		mutationFn: (data: Database['public']['Tables']['task']['Update']) =>
			updateClientTask(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['task', id] });
			toast.success('Task updated successfully!');
			closeModal();
		},
		onError: error => {
			console.log(error);
			toast.error(`Failed to update task, ${error?.message}`);
		},
	});
	const onSubmit: SubmitHandler<TFormData> = data => {
		mutate({ title: data.title, due_date: data.due_date.toISOString(), icon: data.icon });
	};

	return (
		<WrapperModal closeModal={closeModal}>
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<Header title={`Edit task`} closeModal={closeModal} />

				<Form
					setValue={setValue}
					watch={watch}
					control={control}
					formElement={TASK_EDIT_FIELDS}
					handleOnSubmit={handleSubmit(onSubmit)}
					register={register}
					errors={errors}
					isPending={isPending}
					btnText='Submit'
				/>
			</div>
		</WrapperModal>
	);
};
