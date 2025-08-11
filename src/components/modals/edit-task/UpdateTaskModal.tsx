'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Modal from '@/components/ui/modal/Modal';

import type { MODAL_ICON } from '@/shared/data/icon.data';
import type { Database } from '@/shared/types/db/db.types';
import { type TFormData, ZTaskEditScheme } from '@/shared/types/form/scheme.zod';



import { TASK_EDIT_FIELDS } from './task.edit.data';
import { getClientTaskById, updateClientTask } from '@/services/tasks/task-client.service';
import { useModalStore } from '@/store/modals.store';
import Form from '@/components/ui/form/Form';




export const UpdateTaskModal = ({ id }: { id: string }) => {

	const {close} = useModalStore()
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
	}, [isSuccess, data, reset]);

	// tanstack query

	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationKey: ['task', 'update', id],
		mutationFn: (data: Database['public']['Tables']['task']['Update']) =>
			updateClientTask(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['task', id] });
			toast.success('Task updated successfully!');
			close();
		},
		onError: error => {
			console.log(error);
			toast.error(`Failed to update task, ${error?.message}`);
		},
	});
	const onSubmit: SubmitHandler<TFormData> = data => {
		mutate({ title: data.title, due_date: data.due_date.toISOString(), icon: data.icon });
	};
	if (!id) return null;
	return (
		<Modal title='Edit Task' close={close}>
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
		</Modal>
	);
};
