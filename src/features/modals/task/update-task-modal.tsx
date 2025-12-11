'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Form from '@/widgets/form/Form';

import type { MODAL_ICON } from '@/shared/config/icon-config';
import { type TTaskUpdateForm, ZTaskEditScheme } from '@/shared/model/scheme';
import type { TTaskEditForm } from '@/shared/model/task-types';
import Modal from '@/shared/ui/modal/Modal';

import { TASK_EDIT_FIELDS } from '../../../shared/config/task-edit-config';

import { getClientTaskById, updateClientTask } from '@/entities/task/api/task-client-service';

interface Props {
	id: string;
	close: () => void;
}
export const UpdateTaskModal = ({ id, close }: Props) => {
	// react-hook-form
	const {
		reset,
		handleSubmit,
		register,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm<TTaskUpdateForm>({
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
		mutationFn: ({ id, data }: { id: string; data: TTaskEditForm }) => updateClientTask(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			toast.success('Task updated successfully!');
			close();
		},
		onError: error => {
			console.log(error);
			toast.error(`Failed to update task, ${error?.message}`);
		},
	});
	const onSubmit: SubmitHandler<TTaskUpdateForm> = data => {
		mutate({
			id,
			data: { title: data.title, due_date: data.due_date.toISOString(), icon: data.icon },
		});
	};
	if (!id) return null;
	return (
		<Modal title='Edit Task' close={close}>
			<Form<TTaskUpdateForm>
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
