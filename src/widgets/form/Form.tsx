'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { FieldValues } from 'react-hook-form';

import { Button } from '@/shared/ui/buttons/Button';
import { DateField } from '@/shared/ui/fields/DateField';
import { Field } from '@/shared/ui/fields/Field';
import { IconField } from '@/shared/ui/fields/IconField';

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
}: IForm<T>) {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<form onSubmit={handleOnSubmit} className='my-5 flex w-full flex-col gap-0.5 2xl:gap-2'>
			{formElement.map((item, i) => {
				switch (item.type) {
					case 'icon':
						if (!setValue || !watch) {
							if (process.env.NODE_ENV !== 'production') {
								console.warn('Form: "icon" элемент требует setValue и watch');
							}
							return null;
						}
						return (
							<IconField<T>
								key={i}
								setValue={setValue}
								watch={watch}
								fieldName={item.props.fieldName}
							/>
						);
					case 'date':
						return (
							<DateField
								key={i}
								name={item.props.name}
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
			<div className='flex gap-3'>
				<Button type='submit' className={btnClassName} disabled={isPending}>
					{isPending ? 'Sending...' : btnText}
				</Button>
				{pathname === '/settings' && (
					<Button
						type='button'
						onClick={() => router.back()}
						className={btnClassName}
						disabled={isPending}
					>
						Back
					</Button>
				)}
			</div>
		</form>
	);
}
