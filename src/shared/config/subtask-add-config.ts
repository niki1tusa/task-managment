import type { SubTaskForm } from '@/shared/model/scheme';

import type { IForm } from '@/widgets/form/form.types';

export const SUB_TASK_ADD_FIELDS = [
	{
		type: 'field',
		props: {
			labelText: 'Title',
			registerName: 'title',
			placeholderText: 'Enter title',
			type: 'text',
		},
	},
] satisfies IForm<SubTaskForm>['formElement'];
