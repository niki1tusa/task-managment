'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import { Button } from '@/components/ui/Button';

import type { ILoginForm } from '@/shared/types/task.types';

import Header from '../../header-modals/Header';
import { ZLoginScheme, ZSubTaskScheme } from '../../scheme.zod';

export default function LoginFormModal() {
	const notify = () => toast.success('Authorized is success!');
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

	// react-hook-form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>({
		resolver: zodResolver(ZLoginScheme),
	});
	const onSubmit: SubmitHandler<ILoginForm> = data => {
		console.log(data);
		notify();
		setTimeout(() => {
			closeModal();
		}, 1000);
	};

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
				<Header title={`Login`} closeModal={closeModal} />

				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
					<div>
						<label className='mb-1 block font-medium'>Email:</label>
						<input
							{...register('email')}
							placeholder='example@email.com'
							className='text-gray w-full rounded border p-2 shadow shadow-neutral-400 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff]'
							type='text'
						/>
						{errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
					</div>
					<div>
						<label className='mb-1 block font-medium'>Password:</label>
						<input
							{...register('password')}
							placeholder='Enter passowrd'
							className='text-gray w-full rounded border p-2 shadow shadow-neutral-400 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff]'
							type='text'
						/>
						{errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
					</div>
					<Button type='submit'>Send</Button>
				</form>
			</div>
		</>
	);
}
