import type { IForm } from '@/components/ui/form/form.types';

import type { TSubTaskRowForm } from '@/shared/types/scheme';

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
] satisfies IForm<TSubTaskRowForm>['formElement'];
