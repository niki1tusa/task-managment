'use client';

import { usePathname } from 'next/navigation';
import type { FieldValues } from 'react-hook-form';

import { PUBLIC_PAGES } from '@/config/public-page.config';

import { Button } from '../button/Button';
import { DateField } from '../field/DateField';
import { Field } from '../field/Field';
import { IconField } from '../field/IconField';

import type { IForm } from './form.types';

export default function Form<T extends FieldValues>({
	formElement,
	handleOnSubmit,
	register,
	errors,
	btnText,
	btnClassName,
	setValue,
	watch,
	control,
	isPending,
	isEmailVariant
}: IForm<T>) {

	return (
		<form onSubmit={handleOnSubmit} className='my-5 flex flex-col gap-0.5 2xl:gap-2'>
			{formElement.map((item, i) => {
				switch (item.type) {
					case 'icon':
						return <IconField key={i} setValue={setValue} watch={watch} />;
					case 'date':
						return (
							<DateField
								key={i}
								labelText={item.props.labelText}
								placeholderText={item.props.placeholderText}
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
								type={item.props.type}
								errors={errors}
							/>
						);
				}
			})}
			{isEmailVariant && <div className='h-[70px]' />}
			<Button type='submit' className={btnClassName} disable={isPending}>
				{isPending ? 'Sending...' : btnText}
			</Button>
		</form>
	);
}
