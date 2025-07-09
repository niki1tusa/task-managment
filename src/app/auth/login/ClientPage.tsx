'use client';

import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

import Form from '@/components/ui/Form';

import { ZLoginScheme } from '../../../components/dashboard/modals/scheme.zod';

export default function ClientPage() {
	const router = useRouter();

	return (
		<div className='px-5 py-3'>
			<ToastContainer />
			{/* Модалка */}
			<div
				onClick={e => e.stopPropagation()}
				className='w-[60%] transform rounded-lg bg-white p-4 text-xl text-black shadow-lg'
			>
				<h1>Login</h1>
				<Form
					router={router}
					zodScheme={ZLoginScheme}
					isEmail={true}
					isPassword={true}
					btnText='Send'
				/>
			</div>
		</div>
	);
}
