'use client';

import clsx from 'clsx';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import {
	type FieldErrors,
	type FieldValues,
	type Path,
	type UseFormRegister,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	labelText: string;
	registerName: Path<T>;
	type?: string;
	placeholderText?: string;
}

export function Field<T extends FieldValues>({
	labelText,
	registerName,
	type = 'text',
	placeholderText,
	register,
	errors,
}: Props<T>) {
	const [isShowEye, setIsShowEye] = useState(false);

	return (
		<div className=''>
			<label className='mb-1 block font-medium xl:text-sm'>{labelText}:</label>
			<span className='relative'>
				{type === 'password' && (
					<Lock
						size={20}
						className='text-gray absolute top-[60%] left-[2%] z-20 -translate-y-[50%] transform'
					/>
				)}
				{type === 'email' && (
					<Mail
						size={20}
						className='text-gray absolute top-[60%] left-[2%] z-20 -translate-y-[50%] transform'
					/>
				)}
				<input
					{...register(registerName)}
					className={clsx(
						'text-gray h-[30%] w-[80%] rounded border py-5 text-sm shadow shadow-neutral-400 transition-all duration-200 hover:scale-y-105 hover:bg-[#f6f4ff]/50 focus:border-2 focus:border-sky-600 focus:bg-[#f6f4ff] focus:shadow-none 2xl:w-full 2xl:text-lg',
						type === 'password' || type === 'email' ? 'pl-8' : 'pl-4'
					)}
					type={type === 'password' ? (isShowEye ? 'text' : 'password') : 'text'}
					placeholder={placeholderText}
				/>
				{type === 'password' && (
					<button
						type='button'
						onClick={() => setIsShowEye(!isShowEye)}
						className='text-gray absolute top-[60%] right-2 -translate-y-[50%] transform'
					>
						{isShowEye ? <Eye /> : <EyeOff />}
					</button>
				)}
			</span>
			{errors[registerName] && (
				<p className='text-sm text-red-500'>{errors[registerName].message as string}</p>
			)}
		</div>
	);
}
