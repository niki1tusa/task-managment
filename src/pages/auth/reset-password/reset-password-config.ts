import type { TResetPasswordForm } from '@/shared/model/scheme';

import type { IForm } from '@/widgets/form/form.types';

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
