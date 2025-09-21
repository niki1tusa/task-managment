'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import type { TChannelInsert } from '@/components/pages/messages/channel/channel.types';
import { Button } from '@/components/ui/button/Button';
import Form from '@/components/ui/form/Form';
import type { IForm } from '@/components/ui/form/form.types';
import Modal from '@/components/ui/modal/Modal';

import { type TScheduleForm, ZScheduleScheme } from '@/shared/types/form/scheme.zod';

import { createClientChannelByTaskId } from '@/services/channel/channel-client.service';

const calendarEventField = [
	{
		type: 'field',
		props: {
			labelText: 'Event name',
			registerName: 'title',
			placeholderText: 'Enter event...',
			type: 'text',
		},
	},
	{
		type: 'field',
		props: {
			labelText: 'Date',
			registerName: 'event_date',
			placeholderText: '2025-09-20',
			type: 'date',
		},
	},
	{
		type: 'field',
		props: {
			labelText: 'Time',
			registerName: 'event_time',
			placeholderText: '10:00',
			type: 'time',
		},
	},
] satisfies IForm<TScheduleForm>['formElement'];
interface Props {
	close: () => void;
}
export function CreateCalendarEvent({ close }: Props) {
	const eventsService = useMemo(() => createEventsServicePlugin(), []);
	const queryClient = useQueryClient();
	const form = useForm<TScheduleForm>({
		resolver: zodResolver(ZScheduleScheme),
		defaultValues: {
			title: '',
			event_date: '',
			event_time: '',
		},
	});
	const { mutate, isPending } = useMutation({
		mutationFn: ({ fields, taskId }: { fields: TChannelInsert; taskId: string }) =>
			createClientChannelByTaskId(fields, taskId),
		onSuccess: () => {
			toast.success(`Event is success created!`);
			queryClient.invalidateQueries({ queryKey: [''] });
		},
		onError: err => {
			console.log(err);
			toast.error('Calendar is error!');
		},
	});
	const handleAddEvent = () => {
		const today = Temporal.Now.plainDateISO();
		const time = today.toPlainDateTime(Temporal.PlainTime.from('10:00'));

    eventsService.add({
      id: crypto.randomUUID(),
      title: data.title,
      start, 
    });
	};

	// date picker?
	return (
		<Modal close={close} title={`Add a new events`}>
			<div className='flex w-full flex-col gap-3'>
				<Form<TScheduleForm>
					formElement={calendarEventField}
					register={form.register}
					handleOnSubmit={handleAddEvent}
					btnText='Add'
					isPending={isPending}
					errors={form.formState.errors}
				/>
			</div>
		</Modal>
	);
}
