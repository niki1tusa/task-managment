'use client';

import { CalendarFold } from 'lucide-react';
import { type ComponentRef, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, type FieldValues, type Path } from 'react-hook-form';
import type { IDateField } from '../form/form.types';


export function DateField<T extends FieldValues>({ labelText, placeholderText, control, errors }: IDateField<T>) {
	const refDate = useRef<ComponentRef<typeof DatePicker>>(null);
	 const name = 'due_date' as Path<T>;
	return (
		<div className='mb-5'>
			<label className='mb-1 block text-sm font-medium 2xl:text-sm'>{labelText}:</label>

			<span className='relative'>
				<Controller
					control={control}
					name={name}
					render={({ field }) => (
						<DatePicker
							ref={refDate}
							selected={field.value}
							onChange={field.onChange}
							dateFormat='yyyy-MM-dd'
							className='text-gray h-[30%] w-full rounded border p-2 text-sm shadow shadow-neutral-400 transition-all duration-200  hover:bg-[#f6f4ff] focus:bg-[#f6f4ff] focus:border-sky-500 2xl:w-full 2xl:text-lg'
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

			{errors?.due_date?.message && (
				<p className='text-sm text-red-500'>{errors?.due_date?.message as string}</p>
			)}
		</div>
	);
}
