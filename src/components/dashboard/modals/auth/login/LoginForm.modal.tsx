'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import { Button } from '@/components/ui/Button';
import Form from '@/components/ui/Form';

import type { ILoginForm } from '@/shared/types/task.types';

import Header from '../../header-modals/Header';
import { ZLoginScheme, ZSubTaskScheme } from '../../scheme.zod';

export default function LoginFormModal() {
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
				<Form
					closeModal={closeModal}
					isEmail={true}
					isPassword={true}
					btnText='Send'
					zodScheme={ZLoginScheme}
					successMessage='Authorized is success!'
				/>
			</div>
		</>
	);
}
