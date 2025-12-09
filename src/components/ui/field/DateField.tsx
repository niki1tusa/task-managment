'use client';

import clsx from 'clsx';
import { CalendarFold } from 'lucide-react';
import { type ComponentRef, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, type FieldValues } from 'react-hook-form';

import type { IDateField } from '../form/form.types';

export function DateField<T extends FieldValues>({
	labelText,
	placeholderText,
	control,
	errors,
	name,
}: IDateField<T>) {
	const refDate = useRef<ComponentRef<typeof DatePicker>>(null);
	return (
		<div className='mb-5 w-full'>
			<label className='mb-1 block text-sm font-medium 2xl:text-sm'>{labelText}:</label>

			<span className='relative w-full'>
				<Controller
					control={control}
					name={name}
					render={({ field }) => (
						<DatePicker
							ref={refDate}
							selected={field.value}
							onChange={field.onChange}
							dateFormat='yyyy-MM-dd'
							className={clsx(
								'focus:bg-[#f6f4ff] focus:shadow-lg focus:ring-2 focus:shadow-sky-300/20 focus:ring-sky-600',
								'text-gray shadow-default h-[30%] w-full rounded border p-2 text-sm transition-all duration-200 hover:bg-[#f6f4ff] 2xl:text-lg'
							)}
							minDate={new Date()}
							placeholderText={placeholderText || '2026-01-01'}
						/>
					)}
				/>

				<button
					type='button'
					onClick={() => refDate.current?.setFocus?.()}
					className='text-gray absolute top-[50%] right-[2%] z-20 -translate-y-[50%] transform'
				>
					<CalendarFold />
				</button>
			</span>

			{errors?.name?.message && (
				<p className='text-sm text-red-500'>{errors?.name?.message as string}</p>
			)}
		</div>
	);
}
