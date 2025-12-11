import type { TScheduleForm } from '@/shared/model/scheme';

import type { IForm } from '@/widgets/form/form.types';

export const CALENDAR_EVENT_FIELDS = [
	{
		type: 'field',
		props: { labelText: 'Title', registerName: 'title', placeholderText: 'Meeting' },
	},
	{ type: 'date', props: { name: 'event_date', labelText: 'Date', placeholderText: 'YYYY-MM-DD' } },
	{
		type: 'field',
		props: {
			labelText: 'Start',
			registerName: 'event_start',
			type: 'time',
			placeholderText: 'HH:MM',
		},
	},
	{
		type: 'field',
		props: { labelText: 'End', registerName: 'event_end', type: 'time', placeholderText: 'HH:MM' },
	},
] satisfies IForm<TScheduleForm>['formElement'];
