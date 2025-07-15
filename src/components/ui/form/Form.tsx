'use client';

import { Button } from '@/components/ui/Button';

import { DateField } from '../field/DateField';
import { Field } from '../field/Field';
import { IconField } from '../field/IconField';

import type { IForm } from './form.types';

export default function Form({
	formElement,
	handleOnSubmit,
	register,
	errors,
	btnText,
	btnClassName,
	setValue,
	watch,
	control,
	nameController,
}: IForm) {
	return (
		<form onSubmit={handleOnSubmit} className='flex flex-col gap-0.5 2xl:gap-2'>
			{formElement.map((item, i) => {
				switch (item.type) {
					case 'icon':
						return <IconField key={i} setValue={setValue} watch={watch} />;
					case 'date':
						return (
							<DateField
								key={i}
								labelText={item.props.labelText}
								nameController={nameController}
								// placeholderText={item.props.placeholderText}
								control={control}
								errors={errors}
							/>
						);
					default:
						return (
							<Field
								key={i}
								register={register}
								labelText={item.props.labelText}
								registerName={item.props.registerName}
								placeholderText={item.props.placeholderText}
								type={item.type}
								errors={errors}
							/>
						);
				}
			})}

			<Button type='submit' className={btnClassName}>
				{btnText}
			</Button>
		</form>
	);
}
