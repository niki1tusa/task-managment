'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


import { Button } from '@/components/ui/Button';
import Form from '@/components/ui/Form';


import { WrapperModal } from '../Wrapper.modal';
import Header from '../header-modals/Header';
import { ZLoginScheme } from '../scheme.zod';

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
		<WrapperModal closeModal={closeModal} isLogin={true}>
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
		</WrapperModal>
	);
}
