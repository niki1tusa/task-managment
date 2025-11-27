import type { IForm } from '@/components/ui/form/form.types';

type TEmailOnly = { email: string };

export const loginEmailFields = [
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
] satisfies IForm<TEmailOnly>['formElement'];

// форма ожидает T = { phone: string; password: string }
type TPhonePwd = { phone: string; password: string };

export const loginPhonePasswordFields = [
	{
		type: 'field',
		props: {
			labelText: 'Phone',
			registerName: 'phone', // ← ключ формы, а не string
			placeholderText: '+15551234567',
			type: 'tel',
			inputMode: 'tel',
			autoComplete: 'tel',
		},
	},
	{
		type: 'field',
		props: {
			labelText: 'Password',
			registerName: 'password', // ← ключ формы, а не string
			placeholderText: 'Your password',
			type: 'password',
			autoComplete: 'current-password',
		},
	},
] satisfies IForm<TPhonePwd>['formElement']; // ← сохраняем литералы и проверяем контракт
