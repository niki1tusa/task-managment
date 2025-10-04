'use client';

import {
	createViewDay,
	createViewMonthAgenda,
	createViewMonthGrid,
	createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import 'temporal-polyfill/global';

import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/button/Button';

import { useModalStore } from '@/store/modals.store';

import { type TEventRow, getAllEvents } from '@/services/shedule-event/shedule-event.service';

import './calendar.css';
import '@schedule-x/theme-default/dist/index.css';

export default function CalendarApp() {
	const eventsService = useMemo(() => createEventsServicePlugin(), []);
	const { open } = useModalStore();

	const calendar = useNextCalendarApp({
		views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
		dayBoundaries: {
			start: '09:00',
			end: '17:00',
		},
		weekOptions: {
			gridHeight: 700,
			timeAxisFormatOptions: { hour: '2-digit' },
		},
		events: [],
		plugins: [eventsService],
	});

	const { data } = useQuery<TEventRow[]>({
		queryKey: ['events'],
		queryFn: () => getAllEvents(),
	});
	useEffect(() => {
		if (!data) return;
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const mapped = data.map(e => {
			const startPdt = Temporal.PlainDateTime.from(`${e.event_date}T${e.event_start}`);
			const endPdt = Temporal.PlainDateTime.from(`${e.event_date}T${e.event_end}`);
			return {
				id: e.schedule_id,
				title: e.title ?? 'Untitled',
				start: startPdt.toZonedDateTime(timeZone),
				end: endPdt.toZonedDateTime(timeZone),
			};
		});
		eventsService.set(mapped);
	}, [data, eventsService]);

	return (
		<div
			role='region'
			aria-label='Calendar'
			className='w-full rounded-2xl border border-black/5 bg-white/70 p-3 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/20'
		>
			<div className='mb-3 flex min-w-0 items-center justify-between'>
				<Title heading='page'>Schedule</Title>
				<Button onClick={() => open('createCalendarEvent')} className='w-[150px]'>
					+ Add event
				</Button>
			</div>

			<div className='sx-react-calendar-wrapper h-[900px] min-h-[420px] w-full'>
				<ScheduleXCalendar calendarApp={calendar} />
			</div>
		</div>
	);
}
