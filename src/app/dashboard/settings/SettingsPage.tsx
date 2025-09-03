'use client';

import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Title } from '@/components/ui/Title';
import Form from '@/components/ui/form/Form';
import type { IForm } from '@/components/ui/form/form.types';

import type { TSettingsForm } from '@/shared/types/form/scheme.zod';

import { useProfile } from '@/hooks/useProfile';

import { updateProfile } from '@/services/profile/profile-client.service';

type TName = { name: string; email: string; password: string; phone: string };
export const SettingFields = [
	{
		type: 'field',
		props: {
			labelText: 'Name',
			registerName: 'name',
			type: 'text',
			inputMode: 'text',
			autoComplete: 'name',
		},
	},
	{
		type: 'field',
		props: {
			labelText: 'Email',
			registerName: 'email',
			placeholderText: 'name@example.com',
			type: 'email',
			inputMode: 'email',
			autoComplete: 'email',
		},
	},

	{
		type: 'field',
		props: {
			labelText: 'Phone',
			registerName: 'phone',
			placeholderText: '+15551234567',
			type: 'tel',
			inputMode: 'tel',
			autoComplete: 'tel',
		},
	},
	{
		type: 'field',
		props: {
			labelText: 'Password',
			registerName: 'password',
			placeholderText: 'Your password',
			type: 'password',
			autoComplete: 'current-password',
		},
	},
] satisfies IForm<TName>['formElement'];
export default function SettingsClientPage() {
	const form = useForm<TSettingsForm>();

	const { profile: user, isLoading, isError } = useProfile();
	useEffect(() => {
		if (!user) return;
		form.reset({
			name: user.name,
			email: user.email,
			password: user.password,
			phone: user.phone,
		});
	}, [user]);
	const { mutate } = useMutation({
		mutationFn: payload => updateProfile(payload),
		onSuccess: () => toast.success('Profile settings is success updates!'),
	});
	const onSubmitUpdateProfile: SubmitHandler<TSettingsForm> = data => {
		mutate(data);
	};
	return (
		<div className='relative grid h-full grid-cols-[1fr_1fr_1fr] gap-6 px-5 pt-7'>
			{/* left side */}
			<div className='h-full border-r'>
				<Title heading='page'>Settings</Title>
				<div className='px-2'>
					<Form<TSettingsForm>
						formElement={SettingFields}
						handleOnSubmit={form.handleSubmit(onSubmitUpdateProfile)}
						register={form.register}
						errors={form.formState.errors}
						btnText='Save'
					/>
				</div>
			</div>
			{/* right side */}
			<div>
				{/* add img input or button? */}
				<button className='flex h-[400px] w-[300px] items-center justify-center rounded-md border-2'>
					<Plus size={100} className='text-gray' />
				</button>
				<span className='text-gray ml-2 text-[10px]'>Add image for you profile</span>
			</div>
		</div>
	);
}
