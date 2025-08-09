'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Form from '@/components/ui/form/Form';

import type { TSubTaskInsert, TTaskCreateForm } from '@/shared/types/task/task.types';

import { prepareTaskPayload } from '@/utils/format-date-createTask';

import Header from '../../../../../components/dashboard/modals/Header.modal';
import { WrapperModal } from '../../../../../components/dashboard/modals/Wrapper.modal';
import { TASK_EDIT_FIELDS } from '../[id]/edit-task/task.edit.data';

import { createClientSubTask, createClientTask } from '@/services/tasks/task-client.service';
import { useCloseModal } from '@/hooks/useCloseModal';

export const AddTaskForm = () => {
	const router = useRouter();
	const { mutateAsync: createTask } = useMutation({
		mutationKey: ['add-task'],
		mutationFn: (payload: TTaskCreateForm) => createClientTask(payload),
	});

	const { mutateAsync: createSubTask } = useMutation({
		mutationKey: ['add-subtask'],
		mutationFn: ({ id, payload }: { id: string; payload: TSubTaskInsert }) =>
			createClientSubTask(id, payload),
	});

	const onSubmit: SubmitHandler<TTaskCreateForm> = async data => {
		// fnc payload -> обработанная date: 
		const taskPayload = prepareTaskPayload(data);
		
		try {
			const task = await createTask(taskPayload); // ждём завершения создания task
			// Сабтаск создаём только после того, как task гарантированно есть в БД
			await createSubTask({
				id: task.id,
				payload: {
					title: 'Example subtask',
					is_completed: false, // явно, чтобы не было NULL
				},
			});

			toast.success('Task and subtask created!');
			closeModal();
		} catch (err) {
			toast.error('Error creating task or subtask');
			console.error(err);
		}
	};

	const {
		setValue,
		control,
		watch,
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TTaskCreateForm>();


	const closeModal = () => router.back();
	useCloseModal()

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
