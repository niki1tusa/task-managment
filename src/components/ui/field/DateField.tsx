'use client';

import { CalendarFold } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { Controller, type Control, type FieldErrors} from 'react-hook-form';

interface Props {
	labelText: string;
	nameController: 'due.date';
	control?: Control<any>;
	errors?: FieldErrors;
	placeholderText?: string;
}
export function DateField({ nameController, labelText, placeholderText, control, errors }: Props) {
	return (
		<div>
			<label className='mb-1 block font-medium'>{labelText}:</label>

			<span className='relative'>
				<Controller
					control={control}
					name={nameController}
					render={({ field }) => (
						<DatePicker
							selected={field.value}
							onChange={field.onChange}
							dateFormat='yyyy-MM-dd'
							className='text-gray w-full rounded border p-2 shadow shadow-neutral-400 transition-all duration-200 hover:mb-0.5 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff]'
							minDate={new Date()}
							placeholderText={placeholderText}
						/>
					)}
				/>

				<button type='button' className='text-gray absolute top-[1px] right-2'>
					<CalendarFold />
				</button>
			</span>

			{errors[nameController] && <p className='text-sm text-red-500'>{errors[nameController].message as string}</p>}
		</div>
	);
}
