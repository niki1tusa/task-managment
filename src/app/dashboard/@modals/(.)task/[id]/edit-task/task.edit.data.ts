import type { TTaskCreateForm } from '@/shared/types/task/task.types';
import type { FormElement } from '../../../../../../components/ui/form/form.types';


export const TASK_EDIT_FIELDS: FormElement<TTaskCreateForm>[] = [
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
			labelText: 'Due',
		},
	},
	{
		type: 'icon',
	},
];
