'use client';

import clsx from 'clsx';
import { Eye, EyeOff, Lock, Mail, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
	type FieldErrors,
	type FieldValues,
	type Path,
	type UseFormRegister,
} from 'react-hook-form';

import { PUBLIC_PAGES } from '@/shared/config/public-page-config';

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
	const pathname = usePathname();
	return (
		<div className='relative w-full'>
			{pathname !== PUBLIC_PAGES.LOGIN && (
				<label className='mb-1 block font-medium xl:text-sm'>{labelText}:</label>
			)}
			<span className='relative'>
				{type === 'password' && (
					<Lock
						size={20}
						className='text-gray absolute top-[50%] left-[2%] z-20 -translate-y-[50%] transform'
					/>
				)}
				{type === 'email' && (
					<Mail
						size={20}
						className='text-gray absolute top-[50%] left-[2%] z-20 -translate-y-[50%] transform'
					/>
				)}
				{type === 'tel' && (
					<Phone
						size={20}
						className='text-gray absolute top-[50%] left-[2%] z-20 -translate-y-[50%] transform'
					/>
				)}
				<input
					{...register(registerName)}
					className={clsx(
						'focus:bg-[#f6f4ff] focus:shadow-lg focus:ring-2 focus:shadow-sky-300/20 focus:ring-sky-600',
						'shadow-default placeholder:text-gray focus:placeholder:text-gray focus:text-gray h-[30%] w-[80%] rounded py-5 text-sm transition-all duration-200 hover:bg-[#f6f4ff]/50 2xl:w-full 2xl:text-lg',
						type === 'text' ? 'pl-2' : 'pl-7'
					)}
					type={type === 'password' ? (isShowEye ? 'text' : 'password') : 'text'}
					placeholder={placeholderText}
				/>

				{type === 'password' && (
					<button
						type='button'
						onClick={() => setIsShowEye(!isShowEye)}
						className='text-gray absolute top-[50%] right-2 -translate-y-[50%] transform'
					>
						{isShowEye ? <Eye /> : <EyeOff />}
					</button>
				)}
			</span>
			{errors[registerName] && (
				<p className='absolute text-sm text-red-500'>{errors[registerName].message as string}</p>
			)}
		</div>
	);
}
