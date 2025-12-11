'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { type TScheduleForm, ZScheduleScheme } from '@/shared/model/scheme';
import Modal from '@/shared/ui/modal/Modal';

import { CALENDAR_EVENT_FIELDS } from '../../../shared/config/schedule-config';

import { useProfile } from '@/entities/profile/use-profile';
import { type TEventInsert, insertEvent } from '@/entities/schedule/shedule-event-service';
import { toHHMMSS } from '@/features/modals/schedule/format-hour-minutes';
import Form from '@/widgets/form/Form';

interface Props {
	close: () => void;
}
// TODO: что яполучаю из IconField?
export function CreateCalendarEvent({ close }: Props) {
	const { profile } = useProfile();
	const queryClient = useQueryClient();
	const form = useForm<TScheduleForm>({
		resolver: zodResolver(ZScheduleScheme),
		defaultValues: {
			title: '',
			event_date: undefined,
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
			close();
		},
		onError: err => {
			console.log(err);
			toast.error('Calendar is error!');
		},
	});

	const handleAddEvent: SubmitHandler<TScheduleForm> = data => {
		if (!profile?.id) {
			toast.error('You must be logged in to create events');
			return;
		}
		const payload: TEventInsert = {
			title: data.title.trim(),
			event_date: format(data.event_date, 'yyyy-MM-dd'),
			event_start: toHHMMSS(data.event_start),
			event_end: toHHMMSS(data.event_end),
			owner_id: profile.id,
		};
		console.log('msg:', payload);
		mutate(payload);
	};
	return (
		<Modal close={close} title={`Add a new events`}>
			<div className='flex w-full flex-col gap-3'>
				<Form<TScheduleForm>
					formElement={CALENDAR_EVENT_FIELDS}
					register={form.register}
					handleOnSubmit={form.handleSubmit(handleAddEvent)}
					btnText='Create'
					control={form.control}
					isPending={isPending}
					errors={form.formState.errors}
				/>
			</div>
		</Modal>
	);
}
