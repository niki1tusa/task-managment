'use client';

import { CalendarFold } from 'lucide-react';
import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';

import type { IDateField } from './field.types';

export function DateField({ labelText, placeholderText, control, errors }: IDateField) {
	const refDate = useRef(null);
	return (
		<div className='mb-5'>
			<label className='mb-1 block text-sm font-medium 2xl:text-lg'>{labelText}:</label>

			<span className='relative'>
				<Controller
					control={control}
					name='due_date'
					render={({ field }) => (
						<DatePicker
							ref={refDate}
							selected={field.value}
							onChange={field.onChange}
							dateFormat='yyyy-MM-dd'
							className='text-gray h-[30%] w-[80%] rounded border p-2 text-sm shadow shadow-neutral-400 transition-all duration-200 hover:mb-0.5 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff] 2xl:w-full 2xl:text-lg'
							minDate={new Date()}
							placeholderText={placeholderText}
						/>
					)}
				/>

				<button
					type='button'
					onClick={() => (refDate.current as any)?.setFocus?.()}
					className='text-gray absolute top-[60%] right-[22%] z-20 -translate-y-[50%] transform'
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
