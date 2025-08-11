'use client';

import { useMutation } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Form from '@/components/ui/form/Form';
import Modal from '@/components/ui/modal/Modal';

import type { TSubTaskInsert, TTaskCreateForm } from '@/shared/types/task/task.types';

import { useModalStore } from '@/store/modals.store';


import { prepareTaskPayload } from '@/utils/format-date-createTask';


import { createClientSubTask, createClientTask } from '@/services/tasks/task-client.service';
import { TASK_EDIT_FIELDS } from '../edit-task/task.edit.data';

export const CreateTaskModal= () => {
	const { close } = useModalStore();
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
			close();
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

	return (
		<Modal title='Add Task' close={close}>
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
		</Modal>
	);
};
