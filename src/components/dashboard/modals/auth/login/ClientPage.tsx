'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import { Button } from '@/components/ui/Button';

import type { ILoginForm } from '@/shared/types/task.types';

import { PAGE } from '@/config/page.config';

import Header from '../../header-modals/Header';
import { ZLoginScheme } from '../../scheme.zod';
import Form from '@/components/ui/Form';

export default function ClientPage() {
	const router = useRouter();
	const notify = () => toast.success('Authorized is success!');
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
			router.push(PAGE.DASHBOARD);
		}, 1000);
	};

	return (
		<div className='px-5 py-3'>
			<ToastContainer />
			{/* Модалка */}
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<h1>Login</h1>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
					<div>
						<label className='mb-1 block font-medium'>Email:</label>
						<input
							{...register('email')}
							placeholder=''
							className='text-gray w-full rounded border p-2 shadow shadow-neutral-400 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff]'
							type='text'
						/>
						{errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
					</div>
					<div>
						<label className='mb-1 block font-medium'>Password:</label>
						<input
							{...register('password')}
							className='text-gray w-full rounded border p-2 shadow shadow-neutral-400 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff]'
							type='text'
						/>
						{errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
					</div>
					<Button type='submit'>Send</Button>
				</form>
			</div>
		</div>
	);
}
