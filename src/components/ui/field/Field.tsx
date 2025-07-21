'use client';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

import clsx from 'clsx';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

interface Props {
	register: UseFormRegister<any>;
	errors: FieldErrors;
	labelText: string;
	registerName: string
	type?: string
	placeholderText?: string;
}
export function Field({ labelText, registerName, type = 'text', placeholderText, register, errors }: Props) {
	const [isShowEye, setIsShowEye] = useState(false);

	return (
		<div className=''>
			<ToastContainer/>
			<label className='mb-1 block font-medium xl:text-sm'>{labelText}:</label>
			<span className='relative'>
				{type === 'password' && <Lock size={20} className='text-gray z-20 absolute top-[60%] transform -translate-y-[50%] left-[2%]' />}
				{type === 'email' && <Mail size={20} className='text-gray z-20 absolute top-[60%] transform -translate-y-[50%] left-[2%]' />}
				<input
					{...register(registerName)}
					className={clsx(
						'text-gray h-[30%] w-[80%] rounded border py-5 text-sm 2xl:text-lg shadow shadow-neutral-400 transition-all duration-200 hover:scale-y-105 hover:bg-[#f6f4ff]/50 focus:bg-[#f6f4ff] 2xl:w-full',
						 type==='password' || type === 'email'? 'pl-8': 'pl-4'
					)}
					type={type === 'password' ? (isShowEye ? 'text' : 'password') : 'text'}
					placeholder={placeholderText}
				/>
				{type === 'password' && (
					<button
						type='button'
						onClick={() => setIsShowEye(!isShowEye)}
						className='text-gray absolute top-[60%] transform -translate-y-[50%] right-2'
					>
						{isShowEye ? <Eye /> : <EyeOff />}
					</button>
				)}
			</span>
			{errors[registerName] && <p className='text-sm text-red-500'>{errors[registerName].message as string}</p>}
		</div>
	);
}
