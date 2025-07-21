import type { FormElement } from '@/components/ui/form/form.types';

export const loginFields: FormElement[] = [
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
