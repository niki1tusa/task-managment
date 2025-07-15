import type { FormElement } from '../../../ui/form/form.types';

export const TASK_EDIT_FIELDS: FormElement[] = [
	{
		type: 'field',
		props: {
			labelText: 'Title',
			registerName: 'title',
			placeholderText: 'Enter title',
			type: 'text',
		},
	},
	{
		type: 'date',
		props: {
			nameController: 'due.date',
			labelText: 'Due',
		},
	},
	{
		type: 'icon',
	},
];
