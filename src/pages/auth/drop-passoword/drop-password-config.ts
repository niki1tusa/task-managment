import type { TDropPasswordForm } from '@/shared/model/scheme';

import type { IForm } from '@/widgets/form/form.types';

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
