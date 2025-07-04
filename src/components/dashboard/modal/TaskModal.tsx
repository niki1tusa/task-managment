'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { BookAlert, Bug, FileX2Icon, Plane } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { TASKS } from '@/shared/data/task.data';
import type { TFormData } from '@/shared/types/task.types';

import { ZTaskScheme } from './task.zod';

interface Props {
	children: React.ReactNode;
	id: string;
}
export default function TaskModal({ children, id }: Props) {
	const router = useRouter();
	const closeModal = () => router.back();
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []);
	const findTask = TASKS.find(task => task.id === id);
	// react-hook-form
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TFormData>({
		resolver: zodResolver(ZTaskScheme),
		defaultValues: {
			title: findTask?.title || '',
			due:  new Date(findTask.due),
		},
	});
	const onSubmit: SubmitHandler<TFormData> = data => console.log(data);
	return (
		<>
			{/* Оверлей */}
			<div onClick={closeModal} className='bg-opacity-50 bg-background/90 fixed inset-0 z-40' />
			{/* Модалка */}
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<div className='mb-4 flex items-center justify-between'>
					{children}
					<button onClick={closeModal} className='text-2xl font-bold hover:text-red-600'>
						x
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
					<div>
						<label className='mb-1 block font-medium'>Title:</label>
						<input
							{...register('title')}
							className='hover:bg-background focus:bg-background w-full rounded border p-2'
							type='text'
						/>
						{errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
					</div>

					<div>
						<label className='mb-1 block font-medium'>Due date:</label>
						<Controller
							control={control}
							name='due'
							render={({ field }) => (
								<DatePicker
									selected={field.value}
									onChange={field.onChange}
									dateFormat='yyyy-MM-dd'
									className='hover:bg-background focus:bg-background w-full rounded border p-2'
									minDate={new Date()}
									placeholderText='Select due date'
								/>
							)}
						/>
						{errors.due && <p className='text-sm text-red-500'>{errors.due.message}</p>}
					</div>

					<div className='flex items-center gap-2'>
						<label className='font-medium'>Icon:</label>
						<Plane />
						<Bug />
						<BookAlert />
						<FileX2Icon />
					</div>

					<button type='submit' className='bg-primary w-[30%] rounded-2xl py-2 text-white'>
						Save
					</button>
				</form>
			</div>
		</>
	);
}
