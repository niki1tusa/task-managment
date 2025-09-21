'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Form from '@/components/ui/form/Form';
import Modal from '@/components/ui/modal/Modal';

import { type TScheduleForm, ZScheduleScheme } from '@/shared/types/form/scheme.zod';

import { useProfile } from '@/hooks/useProfile';

import { CALENDAR_EVENT_FIELDS } from './schedule.data';
import { type TEventInsert, insertEvent } from '@/services/shedule-event/shedule-event.service';

interface Props {
	close: () => void;
}
export function CreateCalendarEvent({ close }: Props) {
	const { profile } = useProfile();
	const queryClient = useQueryClient();
	const {
		reset,
		control,
		register,
		formState: { errors },
	} = useForm<TScheduleForm>({
		resolver: zodResolver(ZScheduleScheme),
		defaultValues: {
			title: '',
			event_date: '',
			event_time: '',
		},
	});
	const { mutate, isPending } = useMutation({
		mutationFn: (payload: TEventInsert) => insertEvent(payload),
		onSuccess: () => {
			toast.success(`Event is success created!`);
			reset();
			queryClient.invalidateQueries({ queryKey: ['events'] });
		},
		onError: err => {
			console.log(err);
			toast.error('Calendar is error!');
		},
	});
	const handleAddEvent: SubmitHandler<TScheduleForm> = data => {
		console.log(data);
		mutate({ ...data, owner_id: profile?.id || '' });
	};
// TODO: сравнить типы table supabase, zod, IForm
	return (
		<Modal close={close} title={`Add a new events`}>
			<div className='flex w-full flex-col gap-3'>
				<Form<TScheduleForm>
					formElement={CALENDAR_EVENT_FIELDS}
					register={register}
					handleOnSubmit={handleAddEvent}
					btnText='Add'
					control={control}
					isPending={isPending}
					errors={errors}
				/>
			</div>
		</Modal>
	);
}
