'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import cn from 'clsx';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { ZodSchema } from 'zod';

import { ICON_NAMES, MODAL_ICON } from '@/components/dashboard/modals/icon.data';
import { Button } from '@/components/ui/Button';


import { useTaskStore } from '@/store/store';
import type { TFormData } from '../dashboard/modals/scheme.zod';
import { Eye, EyeOff } from 'lucide-react';

interface Props<T extends FieldValues = TFormData> {
	id?: string;
	btnText?: string;
	isIcon?: boolean;
	isTitleField?: boolean;
	isEmail?: boolean;
	isPassword?: boolean;
	isDataField?: boolean;
	zodScheme?: ZodSchema<T>;
	closeModal?: () => void;
	isUpdateTask?: boolean;
	isAddSubTask?: boolean;
	successMessage?: string;
	router?: AppRouterInstance;
}
export default function Form<T extends FieldValues = TFormData>({
	id,
	btnText,
	isIcon = false,
	isTitleField = false,
	zodScheme,
	closeModal,
	isUpdateTask = false,
	isAddSubTask = false,
	isEmail = false,
	isPassword = false,
	isDataField = false,
	successMessage = 'Task edit is success!',
	router,
}: Props<T>) {
	// store
	const tasks = useTaskStore(state => state.tasks);
	const updateTask = useTaskStore(state => state.updateTask);
	const addSubTask = useTaskStore(state => state.addSubTask);

	// notification
	const notify = () => toast.success(successMessage);

	// find task
	const findTask = tasks.find(task => task.id === id);
	//
	const [isShowEye, setIsShowEye] = useState(false)
	// react-hook-form
	const {
		register,
		reset,
		setValue,
		watch,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<T>({
		resolver: zodResolver(zodScheme),
	});
	const onSubmit: SubmitHandler<T> = data => {
		if (id && isUpdateTask) {
			updateTask(id, data);
		}
		if (id && isAddSubTask) {
			addSubTask(id, data);
		}

		notify();
		setTimeout(() => {
			if (closeModal) {
				closeModal();
			} else if (router) {
				router.back();
			}
		}, 1000);
	};

	useEffect(() => {
		if (findTask)
			reset({
				title: findTask?.title,
				due: {
					date: findTask?.due ? new Date(findTask.due.date) : new Date(),
				},
				iconTheme: findTask?.iconTheme || 'Plane',
			});
	}, [id, reset]);
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
			{isTitleField && (
				<div>
					<label className='mb-1 block font-medium'>Title:</label>
					<input
						{...register('title')}
						className='text-gray w-full rounded border p-2 shadow shadow-neutral-400 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff]'
						type='text'
					/>
					{errors.title && <p className='text-sm text-red-500'>{errors.title.message as string}</p>}
				</div>
			)}

			{isDataField && (
				<div>
					<label className='mb-1 block font-medium'>Due date:</label>
					<Controller
						control={control}
						name='due.date'
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
					{errors.due && <p className='text-sm text-red-500'>{errors.due.message as string}</p>}
				</div>
			)}

			{isIcon && (
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
			)}
			{isEmail && (
				<div>
					<label className='mb-1 block font-medium'>Email:</label>
					<input
						{...register('email')}
						placeholder='example@email.com'
						className='text-gray w-full rounded border p-2 shadow shadow-neutral-400 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff]'
						type='text'
					/>
					{errors.email && <p className='text-sm text-red-500'>{errors.email.message as string}</p>}
				</div>
			)}
			{isPassword && (
				<div>
					<label className='mb-1 block font-medium'>Password:</label>
				<span  className='relative'>
					<input
						{...register('password')}
						placeholder='Enter passowrd'
						className='text-gray w-full rounded border p-2 shadow shadow-neutral-400 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff]'
						type='text'
					/>
					<button onClick={()=>setIsShowEye(!isShowEye)} className='absolute right-2 top-[1px] text-gray'>{isShowEye?<Eye/>:<EyeOff/>}</button>
					
					</span>	
					{errors.password && (
						<p className='text-sm text-red-500'>{errors.password.message as string}</p>
					)}
				</div>
			)}
			<Button type='submit'>{btnText}</Button>
		</form>
	);
}
