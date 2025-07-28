import type { Control, FieldErrors } from "react-hook-form";

 export interface IField {
    labelText: string;
    registerName: string
    type: string
    placeholderText: string;
}

export interface IDateField {
	labelText: string;
	nameController?: string;
	control?: Control<any>;
	errors?: FieldErrors;
	placeholderText?: string;
}

export interface IIconField {
	setValue: any;
	watch: any;
}