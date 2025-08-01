'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Header from '@/components/dashboard/modals/Header.modal';
import { WrapperModal } from '@/components/dashboard/modals/Wrapper.modal';

import type { ICON_NAMES, MODAL_ICON } from '@/shared/data/icon.data';
import { type TFormData, ZTaskEditScheme } from '@/shared/types/scheme.zod';

import { taskStore } from '@/store/task.store';

import Form from '../../../../../../components/ui/form/Form';

import { TASK_EDIT_FIELDS } from './task.edit.data';
import { getClientTaskById } from '@/services/tasks/task-client-actions';

export const TaskEditForm = observer(({ id }: { id: string }) => {
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
	// store

	// notification
	const notify = () => toast.success('Task is successfully edit!');

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
	const { data, isSuccess } = useQuery({
		queryKey: ['task', id],
		queryFn: () => getClientTaskById(id),
		enabled: !!id,
	});
	useEffect(() => {
		if (!isSuccess || !data) {
			toast.error('Task not found!');
			return;
		}
		reset({
			title: data.title,
			due_date: new Date(data.due_date),
			icon: data.icon as keyof typeof MODAL_ICON,
		});
	}, [isSuccess]);
	const {} = useMutation({
		mutationKey: ['taks', 'update', id],
		mutationFn: (data: TFormData) => {
			taskStore.editTask(id, data);
		},
	});
	const onSubmit: SubmitHandler<TFormData> = (data: any) => {
		taskStore.editTask(id, { ...data, due_date: data.due_date.toISOString() });

		notify();
		setTimeout(() => {
			if (closeModal) {
				closeModal();
			} else if (router) {
				router.back();
			}
		}, 1000);
	};

	return (
		<WrapperModal closeModal={closeModal}>
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<Header title={`Edit task "${id}"`} closeModal={closeModal} />

				<Form
					setValue={setValue}
					watch={watch}
					control={control}
					formElement={TASK_EDIT_FIELDS}
					handleOnSubmit={handleSubmit(onSubmit)}
					register={register}
					errors={errors}
					btnText='Submit'
				/>
			</div>
		</WrapperModal>
	);
});
