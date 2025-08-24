import type { IForm } from '@/components/ui/form/form.types';

import type { TTaskCreateForm } from '@/shared/types/task/task.types';

export const TASK_EDIT_FIELDS = [
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
		props:{
			fieldName: 'icon'
		}
	},
] satisfies IForm<TTaskCreateForm>['formElement'];
