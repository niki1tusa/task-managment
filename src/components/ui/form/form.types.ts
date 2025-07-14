import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

import type { IDateField, IField, IIconField } from '../field/field.types';

type FormElement =
	| { type: 'field'; props: IField }
	| { type: 'date'; props: IDateField }
	| { type: 'icon'; props: IIconField };
export interface IForm {
	formElement: FormElement[];
	handleOnSubmit: () => void;
	register: UseFormRegister<any>;
	errors: FieldErrors;
	btnText?: string;
	btnClassName?: string;
	fields: IField[];
	IconFields?: any;
	DateFileds?: any;
	setValue?: any;
	watch?: any;
	nameController?: any;
	control?: any;
}
