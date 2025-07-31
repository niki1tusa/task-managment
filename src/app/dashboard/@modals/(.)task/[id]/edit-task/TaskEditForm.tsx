'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Header from '@/components/dashboard/modals/Header.modal';
import { WrapperModal } from '@/components/dashboard/modals/Wrapper.modal';

import { ZTaskEditScheme } from '@/shared/types/scheme.zod';

import { taskStore } from '@/store/task.store';

import Form from '../../../../../../components/ui/form/Form';
import type { FormElement } from '../../../../../../components/ui/form/form.types';

interface Props {
	id: string;
	formElement?: FormElement[];
}
export const TaskEditForm = observer(({ id, formElement }: Props) => {
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
	const tasks = taskStore.tasks;
	const editTask = taskStore.editTask;

	// notification
	const notify = () => toast.success('Task is successfully edit!');

	// find task
	const findTask = tasks.find(task => task.id === id);
	//
	// react-hook-form
	const {
		reset,
		handleSubmit,
		register,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(ZTaskEditScheme),
	});

	const onSubmit = (data: any) => {
		editTask(id, data);

		notify();
		setTimeout(() => {
			if (closeModal) {
				closeModal();
			} else if (router) {
				router.back();
			}
		}, 1000);
	};

	useEffect(() => {
		if (findTask) {
			reset({
				title: findTask.title,
				due_date: new Date(findTask.due_date),
				icon: findTask.icon,
			});
		}
	}, [id, reset, findTask]);
	return (
		<WrapperModal closeModal={closeModal}>
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<Header title={`Edit task "${id}"`} closeModal={closeModal} />

				{formElement && (
					<Form
						setValue={setValue}
						watch={watch}
						control={control}
						formElement={formElement}
						handleOnSubmit={handleSubmit(onSubmit)}
						register={register}
						errors={errors}
						btnText='Submit'
					/>
				)}
			</div>
		</WrapperModal>
	);
});
