'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Form from '@/widgets/form/Form';

import type { TSubTaskInsert } from '@/shared/model/subtask-types';
import type { TTaskCreateForm } from '@/shared/model/task-types';
import Modal from '@/shared/ui/modal/Modal';

import { prepareTaskPayload } from '@/features/modals/task/format-date-createTask';

import { TASK_EDIT_FIELDS } from '../../../shared/config/task-edit-config';

import { createClientSubTask } from '@/entities/task/api/subtask-service';
import { createClientTask } from '@/entities/task/api/task-client-service';

export const CreateTaskModal = ({ close }: { close: () => void }) => {
	const queryClient = useQueryClient();
	const { mutateAsync: createTask } = useMutation({
		mutationKey: ['tasks'],
		mutationFn: (payload: TTaskCreateForm) => createClientTask(payload),
		onError: err => {
			console.log(err);
			toast.error('Channel is error!');
		},
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
			console.log('Creating task with payload:', taskPayload);

			// Создаём основную задачу
			const task = await createTask(taskPayload);

			// Создаём подзадачу
			await createSubTask({
				id: task.id,
				payload: {
					title: 'Example subtask',
					is_completed: false,
				},
			});

			// Инвалидируем все связанные запросы
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['tasks'] }),
				queryClient.invalidateQueries({ queryKey: ['task'] }),
				queryClient.refetchQueries({ queryKey: ['tasks'] }),
			]);

			toast.success('Task created successfully!');
			close();
		} catch (err) {
			console.error('Error in task creation process:', err);
			toast.error('Error creating task or subtask');
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
