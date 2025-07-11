'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { ZodSchema } from 'zod';

import { Button } from '@/components/ui/Button';

import { useTaskStore } from '@/store/store';

import type { TFormData } from '../dashboard/modals/scheme.zod';

import { DateField } from './field/DateField';
import { Field } from './field/Field';
import { IconField } from './field/IconField';

interface Props<T extends FieldValues = TFormData> {
	id?: string;
	btnText?: string;
	isIconField?: boolean;
	isTitleField?: boolean;
	isEmailField?: boolean;
	isPassowrdField?: boolean;
	isDataField?: boolean;
	zodScheme: ZodSchema<T>;
	closeModal?: () => void;
	isEditTask?: boolean;
	isAddSubTask?: boolean;
	successMessage?: string;
	router?: AppRouterInstance;
}
export default function Form<T extends FieldValues = TFormData>({
	id,
	btnText,
	zodScheme,
	successMessage = 'Task edit is success!',

	isIconField = false,
	isTitleField = false,
	isEmailField = false,
	isPassowrdField = false,
	isDataField = false,

	isEditTask = false,
	isAddSubTask = false,
	closeModal,
	router,
}: Props<T>) {
	// store
	const tasks = useTaskStore(state => state.tasks);
	const EditTask = useTaskStore(state => state.EditTask);
	const addSubTask = useTaskStore(state => state.addSubTask);

	// notification
	const notify = () => toast.success(successMessage);

	// find task
	const findTask = tasks.find(task => task.id === id);
	//
	// react-hook-form
	const { reset, handleSubmit } = useForm<T>({
		resolver: zodResolver(zodScheme),
	});
	const onSubmit: SubmitHandler<T> = data => {
		if (id && isEditTask) {
			EditTask(id, data);
		}
		if (id && isAddSubTask) {
			addSubTask(id, data);
		}

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
		if (findTask)
			reset({
				title: findTask?.title,
				due: {
					date: findTask?.due ? new Date(findTask.due.date) : new Date(),
				},
				iconTheme: findTask?.iconTheme || 'Plane',
			});
	}, [id, reset]);
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-0.5 2xl:gap-6'>
			{isTitleField && (
				<Field labelText='Title' registerName='title' placeholderText='Enter title' type='text' />
			)}

			{isDataField && (
				<DateField
					labelText='Due date'
					nameController='due.date'
					placeholderText='Select due date'
				/>
			)}

			{isIconField && <IconField />}
			{isEmailField && (
				<Field
					labelText='Email'
					registerName='email'
					type='email'
					placeholderText='example@email.com'
				/>
			)}
			{isPassowrdField && (
				<Field
					labelText='Password'
					registerName='password'
					type='password'
					placeholderText='Enter to password'
				/>
			)}
			<Button type='submit'>{btnText}</Button>
		</form>
	);
}
