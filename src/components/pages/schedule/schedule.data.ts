import type { IForm } from "@/components/ui/form/form.types";
import type { TScheduleForm } from "@/shared/types/form/scheme.zod";

export const CALENDAR_EVENT_FIELDS = [
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
		type: 'date',
		props: {
			labelText: 'Date',
		},
	},
	{
		type: 'field',
		props: {
			labelText: 'Start',
			registerName: 'event_start',
			placeholderText: '10:00',
			type: 'time',
		},
	},
		{
		type: 'field',
		props: {
			labelText: 'End',
			registerName: 'event_end',
			placeholderText: '12:00',
			type: 'time',
		},
	},
] satisfies IForm<TScheduleForm>['formElement'];