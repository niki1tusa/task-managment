import type { IForm } from '@/components/ui/form/form.types';

import type { TResetPasswordForm } from '@/shared/types/scheme';

export const resetPassowrdFields = [
	{
		type: 'field',
		props: {
			labelText: 'Password',
			registerName: 'password',
			placeholderText: 'Enter new password',
			type: 'password',
		},
	},
	{
		type: 'field',
		props: {
			labelText: 'Password again',
			registerName: 'passwordAgain',
			placeholderText: 'Enter password again',
			type: 'password',
		},
	},
] satisfies IForm<TResetPasswordForm>['formElement'];
