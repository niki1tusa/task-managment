'use client';

import {  Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
	labelText: string;
	registerName: 'title' | 'email' | 'password';
	type?: 'text' | 'password' | 'email' | 'date';
	placeholderText?: string;
}
export function Field({ labelText, registerName, type = 'text', placeholderText }: Props) {
	const [isShowEye, setIsShowEye] = useState(false);

	const {
		register,
		formState: { errors },
	} = useForm();
	return (
		<div>
			<label className='mb-1 block font-medium'>{labelText}:</label>
			<span className='relative'>
				<input
					{...register(registerName)}
					className='text-gray w-full rounded border p-2 shadow shadow-neutral-400 transition-all duration-200 hover:mb-0.5 hover:bg-[#f6f4ff] focus:bg-[#f6f4ff]'
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
