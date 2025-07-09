'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SquareX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import { Button } from '@/components/ui/Button';

import { useTaskStore } from '@/store/store';

import Header from '../header-modals/Header';
import { ZSubTaskScheme } from '../scheme.zod';

interface Props {
	id: string;
}
type TForm = { title: string };
export default function SubTaskModal({ id }: Props) {
	const addSubTask = useTaskStore(state => state.addSubTask);
	const notify = () => toast.success('Create subtask is success!');
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
	} = useForm<TForm>({
		resolver: zodResolver(ZSubTaskScheme),
	});
	const onSubmit: SubmitHandler<TForm> = data => {
		addSubTask(id, data);
		console.log(data);
		notify();
		setTimeout(() => {
			closeModal();
		}, 2000);
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
				<Header title={`Add Subtask "${id}"`} closeModal={closeModal} />

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
					<Button type='submit'>Save</Button>
				</form>
			</div>
		</>
	);
}
