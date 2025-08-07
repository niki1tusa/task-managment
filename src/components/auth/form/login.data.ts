import type { FormElement } from '@/components/ui/form/form.types';
import type { TLoginForm } from '@/shared/types/form/scheme.zod';

export const loginFields: FormElement<TLoginForm>[] = [
	{
		type: 'field',
		props: {
			labelText: 'Email',
			registerName: 'email',
			placeholderText: 'example@email.com',
			type: 'email',
		},
	},
];
