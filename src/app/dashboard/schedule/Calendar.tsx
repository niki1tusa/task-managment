'use client';

import {
	createViewDay,
	createViewMonthAgenda,
	createViewMonthGrid,
	createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { ScheduleXCalendar, useNextCalendarApp } from '@schedule-x/react';
import { useState } from 'react';
import 'temporal-polyfill/global';

import { Title } from '@/components/ui/Title';

import '@schedule-x/theme-default/dist/index.css';

export function CalendarApp() {
	const eventsService = useState(() => createEventsServicePlugin())[0];
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
		callbacks: { onRender: () => eventsService.getAll() },
	});

	return (
		<div className='w-full max-w-full min-w-0 rounded-2xl border border-black/5 bg-white/70 p-3 shadow-xl shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/20'>
			{/* header */}
			<div className='mb-3 flex min-w-0 items-center justify-between'>
				<Title heading='page'>Schedule</Title>
				<div className='text-xs text-slate-500 dark:text-slate-400'>Local time</div>
			</div>

			{/* calendar wrapper */}
			<div className='sx-react-calendar-wrapper h-[900px] min-h-[420px] w-full max-w-full min-w-0 [contain:layout_paint_size] '>
				<ScheduleXCalendar calendarApp={calendar} />
			</div>

			{/* polish */}
			<style jsx global>{`
				.sx-react-calendar-wrapper,
				.sx-react-calendar-wrapper > * {
					inline-size: 100%;
					max-inline-size: 100%;
					min-inline-size: 0;
				}
				/* сетка/линии */
				.sx-react-calendar-wrapper [class*='grid'] [class*='cell'],
				.sx-react-calendar-wrapper [class*='time'] [class*='row'],
				.sx-react-calendar-wrapper [class*='week'] [class*='hour'] {
					border-color: rgba(15, 23, 42, 0.06);
				}
				/* подсветка сегодня */
				.sx-react-calendar-wrapper [data-today='true'],
				.sx-react-calendar-wrapper [aria-current='date'] {
					background: rgba(59, 130, 246, 0.08);
				}
				/* события */
				.sx-react-calendar-wrapper [class*='event'] {
					border-radius: 0.75rem;
					box-shadow: 0 2px 8px rgba(2, 6, 23, 0.08);
					transition:
						transform 150ms ease,
						box-shadow 150ms ease,
						filter 150ms ease;
				}
				.sx-react-calendar-wrapper [class*='event']:hover {
					transform: translateY(-1px);
					box-shadow: 0 6px 18px rgba(2, 6, 23, 0.12);
					filter: brightness(1.02);
				}
				/* тулбар */
				.sx-react-calendar-wrapper [class*='toolbar'] {
					border-radius: 0.75rem;
					background: rgba(15, 23, 42, 0.03);
				}
				.sx-react-calendar-wrapper [class*='toolbar'] button {
					border-radius: 0.5rem;
				}
				/* подписи */
				.sx-react-calendar-wrapper {
					font-feature-settings: 'tnum' 1;
				}
				.sx-react-calendar-wrapper [class*='hour-label'],
				.sx-react-calendar-wrapper [class*='day-label'] {
					opacity: 0.75;
					font-size: 0.85rem;
				}
				@media (prefers-color-scheme: dark) {
					.sx-react-calendar-wrapper [class*='grid'] [class*='cell'],
					.sx-react-calendar-wrapper [class*='time'] [class*='row'],
					.sx-react-calendar-wrapper [class*='week'] [class*='hour'] {
						border-color: rgba(255, 255, 255, 0.08);
					}
					.sx-react-calendar-wrapper [data-today='true'],
					.sx-react-calendar-wrapper [aria-current='date'] {
						background: rgba(96, 165, 250, 0.15);
					}
					.sx-react-calendar-wrapper [class*='event'] {
						box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
					}
				}
			`}</style>
		</div>
	);
}

export default CalendarApp;
