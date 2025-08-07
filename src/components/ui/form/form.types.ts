import type {
	Control,
	FieldErrors,
	FieldValues,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch,
} from 'react-hook-form';

export interface IField {
	labelText: string;
	registerName: string;
	type: string;
	placeholderText: string;
}

export interface IDateField<T extends FieldValues> {
  labelText: string;
  placeholderText?: string;
  control?: Control<T>;
  errors?: FieldErrors<T>;
}


export interface IIconField<T extends FieldValues = FieldValues> {
	setValue: UseFormSetValue<T>;
	watch: UseFormWatch<T>;
}

export type FormElement<T extends FieldValues = FieldValues> =
	| {
			type: 'field';
			props: {
				labelText: string;
				registerName: keyof T;
				placeholderText: string;
				type: string;
			};
	  }
	| {
			type: 'date';
			props: {
				labelText: string;
				placeholderText?: string;
			};
	  }
	| { type: 'icon' };

export interface IForm<T extends FieldValues> {
	formElement: FormElement<T>[];
	handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	btnText?: string;
	btnClassName?: string;
	IconFields?: any;
	DateFields?: any;
	setValue?: (name: keyof T, value: any) => void;
	watch?: (name?: keyof T) => any;
	control?: Control<T>;
	isPending?: boolean;
}