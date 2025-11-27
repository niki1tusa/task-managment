'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Form from '@/components/ui/form/Form';
import Modal from '@/components/ui/modal/Modal';

import { type TScheduleForm, ZScheduleScheme } from '@/shared/types/scheme.zod';

import { useProfile } from '@/hooks/useProfile';

import { CALENDAR_EVENT_FIELDS } from './schedule.data';
import { type TEventInsert, insertEvent } from '@/services/shedule-event/shedule-event.service';

interface Props {
	close: () => void;
}
export function CreateCalendarEvent({ close }: Props) {
	const { profile } = useProfile();
	const queryClient = useQueryClient();
	const form = useForm<TScheduleForm>({
		resolver: zodResolver(ZScheduleScheme),
		defaultValues: {
			title: '',
			event_date: '',
			event_start: '',
			event_end: '',
		},
	});
	const { mutate, isPending } = useMutation({
		mutationFn: (payload: TEventInsert) => insertEvent(payload),
		onSuccess: () => {
			toast.success(`Event is success created!`);
			form.reset();
			queryClient.invalidateQueries({ queryKey: ['events'] });
		},
		onError: err => {
			console.log(err);
			toast.error('Calendar is error!');
		},
	});
	function toHHMMSS(t: string) {
		return /^\d{2}:\d{2}:\d{2}$/.test(t) ? t : `${t}:00`;
	}

	const handleAddEvent: SubmitHandler<TScheduleForm> = data => {
		if (!profile?.id) {
			toast.error('You must be logged in to create events');
			return;
		}
		const payload: TEventInsert = {
			title: data.title.trim(),
			event_date: data.event_date,
			event_start: toHHMMSS(data.event_start),
			event_end: toHHMMSS(data.event_end),
			owner_id: profile.id,
		};
		console.log('msg:', payload);
		mutate(payload);
		close();
	};
	return (
		<Modal close={close} title={`Add a new events`}>
			<div className='flex w-full flex-col gap-3'>
				<Form<TScheduleForm>
					formElement={CALENDAR_EVENT_FIELDS}
					register={form.register}
					handleOnSubmit={form.handleSubmit(handleAddEvent)}
					btnText='Add'
					control={form.control}
					isPending={isPending}
					errors={form.formState.errors}
				/>
			</div>
		</Modal>
	);
}
