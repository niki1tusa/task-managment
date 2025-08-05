import { 
	type FieldErrors, 
	type UseFormRegister, 
	type UseFormSetValue,
	type UseFormWatch,
	type Control,
	type FieldValues 
} from 'react-hook-form';

import type { IField } from '../field/field.types';

export type FormElement =
	| { type: 'field'; props: IField }
	| {
			type: 'date';
			props: {
				labelText: string;
			};
	  }
	| { type: 'icon' };

export interface IconFieldsProps {
	[key: string]: React.ComponentType<any> | React.ReactNode;
}

export interface DateFieldsProps {
	[key: string]: {
		value?: Date | string;
		onChange?: (date: Date | string) => void;
		placeholder?: string;
		disabled?: boolean;
	};
}

export interface IForm<TFieldValues extends FieldValues = FieldValues> {
	formElement: FormElement[];
	handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
	register: UseFormRegister<TFieldValues>;
	errors: FieldErrors<TFieldValues>;
	btnText?: string;
	btnClassName?: string;
	IconFields?: IconFieldsProps;
	DateFields?: DateFieldsProps;
	setValue?: UseFormSetValue<TFieldValues>;
	watch?: UseFormWatch<TFieldValues>;
	control?: Control<TFieldValues>;
	isPending?: boolean;
}
	

