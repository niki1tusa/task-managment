'use client';

import { Button } from '@/components/ui/Button';

import { DateField } from '../field/DateField';
import { Field } from '../field/Field';
import { IconField } from '../field/IconField';
;

import type { IForm } from './form.types';


export default function Form({
	formElement,
	handleOnSubmit,
	register,
	errors,
	btnText,
	btnClassName,
	fields,
	IconFields,
	DateFields,
	setValue,
	watch,
	control,
	nameController,
}: IForm) {
	return (
		<form onSubmit={handleOnSubmit} className='flex flex-col gap-0.5 2xl:gap-2'>
			{fields.filter(Boolean).map(item => (
				<Field
					key={item.registerName}
					register={register}
					labelText={item.labelText}
					registerName={item.registerName}
					placeholderText={item.placeholderText}
					type={item.type}
					errors={errors}
				/>
			))}
			{DateFields.filter(Boolean).map(item => (
				<DateField
					key={item.registerName}
					labelText={item.labelText}
					nameController={nameController}
					placeholderText={item.placeholderText}
					control={control}
					errors={errors}
				/>
			))}
			{IconFields.filter(Boolean).map(item => (
				<IconField key={item.registerName} setValue={setValue} watch={watch} />
			))}
			<Button type='submit' className={btnClassName}>
				{btnText}
			</Button>
		</form>
	);
}
