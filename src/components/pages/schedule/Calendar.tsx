'use client';

import {
	createViewDay,
	createViewMonthAgenda,
	createViewMonthGrid,
	createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react';
import { useMemo } from 'react';
import 'temporal-polyfill/global';

import { Title } from '@/components/ui/Title';
// вынес кастомные стили сюда
import { Button } from '@/components/ui/button/Button';

import { useModalStore } from '@/store/modals.store';

import './calendar.css';
import '@schedule-x/theme-default/dist/index.css';

export function CalendarApp() {
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
		events: [
			{
				id: '1',
				title: 'Event 1',
				start: Temporal.PlainDate.from('2023-12-16'),
				end: Temporal.PlainDate.from('2023-12-16'),
			},
		],
		plugins: [eventsService],
	});

// TODO: как мне отображать event из supabase?
	return (
		<div
			role='region'
			aria-label='Calendar'
			className='w-full rounded-2xl border border-black/5 bg-white/70 p-3 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/20'
		>
			{/* header */}
			<div className='mb-3 flex min-w-0 items-center justify-between'>
				<Title heading='page'>Schedule</Title>
				<Button onClick={() => open('createCalendarEvent')} className='w-[150px]'>
					+ Add event
				</Button>
			</div>

			{/* calendar wrapper */}
			<div className='sx-react-calendar-wrapper h-[900px] min-h-[420px] w-full'>
				<ScheduleXCalendar calendarApp={calendar} />
			</div>
		</div>
	);
}

export default CalendarApp;
