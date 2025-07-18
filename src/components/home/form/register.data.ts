import type { FormElement } from "@/components/ui/form/form.types";

export const RegisterFields: FormElement[] = [
	{
		type: 'field',
		props: {
			labelText: 'Name',
			registerName: 'name',
			placeholderText: 'Your name',
			type: 'text',
		},
	},
	{
		type: 'field',
		props: {
			labelText: 'Email',
			registerName: 'email',
			placeholderText: 'example@email.com',
			type: 'email',
		},
	},
	{
		type: 'field',
		props: {
			labelText: 'Password',
			registerName: 'password',
			placeholderText: 'Enter password',
			type: 'password',
		},
	},
];
