'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import { Button } from '@/components/ui/Button';

import type { TFormData } from '@/shared/types/task.types';

import { useTaskStore } from '@/store/store';

import Header from './header/Header';
import { ICON_NAMES, MODAL_ICON } from './icon.data';
import { ZTaskScheme } from './scheme.zod';

interface Props {
	children: React.ReactNode;
	id: string;
}
export default function TaskModal({ children, id }: Props) {
	const tasks = useTaskStore(state => state.tasks);
	const updateTask = useTaskStore(state => state.updateTask);
	const notify = () => toast('Task edit is success!');

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
	const findTask = tasks.find(task => task.id === id);
	// react-hook-form
	const {
		register,
		reset,
		setValue,
		watch,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TFormData>({
		resolver: zodResolver(ZTaskScheme),
		defaultValues: {
			title: findTask?.title || '',
			due: findTask?.due ? new Date(findTask.due) : new Date(),
			iconTheme: findTask?.iconTheme || 'Plane',
		},
	});
	const onSubmit: SubmitHandler<TFormData> = data => {
		updateTask(id, data);
		notify();
		setTimeout(() => {
			closeModal();
		}, 2000);
	};

	useEffect(() => {
		if (findTask) {
			reset({
				title: findTask?.title,
				due: new Date(findTask.due),
				iconTheme: findTask?.iconTheme || 'Plane',
			});
		}
	}, [id, reset]);
	return (
		<>
			{/* Оверлей */}
			<div onClick={closeModal} className='bg-opacity-50 bg-background/90 fixed inset-0 z-40' />
			<ToastContainer />
			{/* Модалка */}
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<Header closeModal={closeModal}>{children}</Header>

				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
					<div>
						<label className='mb-1 block font-medium'>Title:</label>
						<input
							{...register('title')}
							className='text-gray w-full rounded border p-2 shadow shadow-neutral-400 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff]'
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
									className='text-gray w-full rounded border p-2 shadow shadow-neutral-400 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff]'
									minDate={new Date()}
									placeholderText='Select due date'
								/>
							)}
						/>
						{errors.due && <p className='text-sm text-red-500'>{errors.due.message}</p>}
					</div>

					<div className='flex items-center gap-2'>
						<label className='font-medium'>Icon:</label>
						<div className='flex gap-3'>
							{ICON_NAMES.map(name => {
								const Icon = MODAL_ICON[name];
								return (
									<button
										onClick={() => setValue('iconTheme', name)}
										type='button'
										key={name}
										className={cn(
											'bg-primary hover:bg-primary/50 rounded-sm p-2 text-white transition-colors',
											{
												'border-2 border-indigo-800 shadow shadow-neutral-400':
													watch('iconTheme') === name,
											}
										)}
									>
										<Icon size={20} />
									</button>
								);
							})}
						</div>
					</div>
					<Button type='submit'>Save</Button>
				</form>
			</div>
		</>
	);
}
