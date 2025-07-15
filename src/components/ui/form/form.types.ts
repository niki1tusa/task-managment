import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

import type { IDateField, IField, IIconField } from '../field/field.types';

export type FormElement =
	| { type: 'field'; props: IField }
	| {
			type: 'date';
			props: {
				nameController: string;
				labelText: string;
			};
	  }
	| { type: 'icon' };

export interface IForm {
	formElement: FormElement[];
	handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
	register: UseFormRegister<any>;
	errors: FieldErrors;
	btnText?: string;
	btnClassName?: string;
	IconFields?: any;
	DateFields?: any;
	setValue?: any;
	watch?: any;
	nameController?: any;
	control?: any;
}
