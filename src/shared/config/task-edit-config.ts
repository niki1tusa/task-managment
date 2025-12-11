import type { IForm } from "@/widgets/form/form.types";

import type { TTaskCreateForm } from '@/shared/model/task-types';

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
			name: 'due_date',
			labelText: 'Due',
		},
	},
	{
		type: 'icon',
		props: {
			fieldName: 'icon',
		},
	},
] satisfies IForm<TTaskCreateForm>['formElement'];
