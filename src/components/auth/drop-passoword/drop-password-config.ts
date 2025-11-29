import type { IForm } from '@/components/ui/form/form.types';

import type { TDropPasswordForm } from '@/shared/types/scheme';

export const dropPasswordFields = [
	{
		type: 'field',
		props: {
			labelText: 'Email',
			registerName: 'email',
			placeholderText: 'example@email.com',
			type: 'email',
		},
	},
] satisfies IForm<TDropPasswordForm>['formElement'];
