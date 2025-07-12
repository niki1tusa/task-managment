'use client';

import clsx from 'clsx';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
	labelText: string;
	registerName: 'title' | 'email' | 'password' | 'name';
	type?: 'text' | 'password' | 'email';
	placeholderText?: string;
}
export function Field({ labelText, registerName, type = 'text', placeholderText }: Props) {
	const [isShowEye, setIsShowEye] = useState(false);

	const {
		register,
		formState: { errors },
	} = useForm();
	return (
		<div className=''>
			<label className='mb-1 block font-medium xl:text-sm'>{labelText}:</label>
			<span className='relative'>
				{type === 'password' && <Lock size={20} className='text-gray absolute top-[25%] left-[2%]' />}
				{type === 'email' && <Mail size={20} className='text-gray absolute top-[25%] left-[2%]' />}
				<input
					{...register(registerName)}
					className={clsx(
						'text-gray h-[30%] w-[80%] rounded border py-5 text-sm shadow shadow-neutral-400 transition-all duration-200 hover:mb-0.5 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff] 2xl:w-full',
						 type==='password' || type === 'email'? 'pl-8': 'pl-4'
					)}
					type={type === 'password' ? (isShowEye ? 'text' : 'password') : 'text'}
					placeholder={placeholderText}
				/>
				{type === 'password' && (
					<button
						type='button'
						onClick={() => setIsShowEye(!isShowEye)}
						className='text-gray absolute top-[1px] right-2'
					>
						{isShowEye ? <Eye /> : <EyeOff />}
					</button>
				)}
			</span>
			{errors.title && <p className='text-sm text-red-500'>{errors.title.message as string}</p>}
		</div>
	);
}
