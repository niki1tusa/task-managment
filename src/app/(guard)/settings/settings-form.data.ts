import type { IForm } from '@/widgets/form/form.types';

type TName = { name: string; occupation: string; email: string; phone: string };
export const SettingFields = [
	{
		type: 'field',
		props: {
			labelText: 'Name',
			registerName: 'name',
			type: 'text',
			inputMode: 'text',
			autoComplete: 'name',
		},
	},
	{
		type: 'field',
		props: {
			labelText: 'Occupation',
			registerName: 'occupation',
			type: 'text',
			inputMode: 'text',
			autoComplete: 'occupatoin',
		},
	},
	{
		type: 'field',
		props: {
			labelText: 'Email',
			registerName: 'email',
			placeholderText: 'name@example.com',
			type: 'email',
			inputMode: 'email',
			autoComplete: 'email',
		},
	},

	{
		type: 'field',
		props: {
			labelText: 'Phone',
			registerName: 'phone',
			placeholderText: 'Enter your tel...',
			type: 'tel',
			inputMode: 'tel',
			autoComplete: 'tel',
		},
	},
] satisfies IForm<TName>['formElement'];
