'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Form from '@/widgets/form/Form';

import { type TSubTaskRowForm, ZSubTaskScheme } from '@/shared/model/scheme';
import Modal from '@/shared/ui/modal/Modal';

import { SUB_TASK_ADD_FIELDS } from '../../../shared/config/subtask-add-config';

import { createClientSubTask } from '@/entities/task/api/subtask-service';

interface Props {
	id: string;
	close: () => void;
}
export const CreateSubtaskModal = ({ id, close }: Props) => {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationKey: ['createSubTask', id],
		mutationFn: (payload: TSubTaskRowForm) => createClientSubTask(id, payload),
		onSuccess: () => {
			toast.success('Subtask is successfully created!');
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
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
			<Form<TSubTaskRowForm>
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
