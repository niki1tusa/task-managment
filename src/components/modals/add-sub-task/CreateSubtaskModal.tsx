'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Form from '@/components/ui/form/Form';
import Modal from '@/components/ui/modal/Modal';

import { type TSubTaskRowForm, ZSubTaskScheme } from '@/shared/types/form/scheme.zod';

import { useModalStore } from '@/store/modals.store';

import { SUB_TASK_ADD_FIELDS } from './subtask.add.data';
import { createClientSubTask } from '@/services/tasks/task-client.service';

export const CreateSubtaskModal = ({ id }: { id: string }) => {
	const { close } = useModalStore();

	const { mutate, isPending } = useMutation({
		mutationKey: ['createSubTask', id],
		mutationFn: (payload: TSubTaskRowForm) => createClientSubTask(id, payload),
		onSuccess: () => {
			toast.success('Subtask is successfully created!');
			close();
		},
		onError: () => toast.error('There was a problem during the creation of the subtask!'),
	});
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<TSubTaskRowForm>({ resolver: zodResolver(ZSubTaskScheme) });

	const onSubmit: SubmitHandler<TSubTaskRowForm> = data => {
		mutate(data);
	};
	return (
		<Modal title='Add Subtask' close={close}>
			<Form
				register={register}
				errors={errors}
				handleOnSubmit={handleSubmit(onSubmit)}
				formElement={SUB_TASK_ADD_FIELDS}
				isPending={isPending}
				btnText='Save'
			/>
		</Modal>
	);
};
