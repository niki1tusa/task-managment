'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { ZodSchema } from 'zod';

import { Button } from '@/components/ui/Button';


import { Field } from '../field/Field';

interface Props {
	id?: string;
	btnText?: string;
	isIconField?: boolean;
	isTitleField?: boolean;
	isEmailField?: boolean;
	isPassowrdField?: boolean;
	isNameField?: boolean;
	isDataField?: boolean;
	isLogin?: boolean;
	btnClassName?: string;
	zodScheme: ZodSchema;
	closeModal?: () => void;
	isEditTask?: boolean;
	isAddSubTask?: boolean;
	successMessage?: string;
}
export interface IField {
	register: any
	errors: any
	labelText: string;
	registerName: 'title' | 'email' | 'password' | 'name';
	type?: 'text' | 'password' | 'email';
	placeholderText?: string;
}
export default function Form({
	id,
	btnText,
	zodScheme,
	successMessage = 'Task edit is success!',
	btnClassName = '',
	isLogin = false,
	isIconField = false,
	isNameField = false,
	isTitleField = false,
	isEmailField = false,
	isPassowrdField = false,
	isDataField = false,
}: Props) {
	const {
		reset,
		handleSubmit,
		register,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(zodScheme),
	});
	return (
		<form onSubmit={() => ''} className='flex flex-col gap-0.5 2xl:gap-2'>
			{[
				isTitleField && {
					labelText: 'Title',
					registerName: 'title',
					placeholderText: 'Enter title',
					type: 'text',
				},
				isNameField && {
					labelText: 'Name',
					registerName: 'name',
					placeholderText: 'Your name',
					type: 'text',
				},
				isEmailField && {
					labelText: 'Email',
					registerName: 'email',
					placeholderText: 'example@email.com',
					type: 'email',
				},
				isPassowrdField && {
					labelText: 'Password',
					registerName: 'password',
					placeholderText: 'Enter password',
					type: 'password',
				},
			]
				.filter(Boolean)
				.map((item: IField )=> (
					<Field
						register={register}
						labelText={item.labelText}
						registerName={item.registerName}
						placeholderText={item.placeholderText}
						type={item.type}
						errors={errors}
					/>
				))}
			<Button type='submit' className={btnClassName}>
				{btnText}
			</Button>
		</form>
	);
}
