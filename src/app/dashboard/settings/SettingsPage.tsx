'use client';

import { useMutation } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { type ChangeEvent, useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';
import Form from '@/components/ui/form/Form';

import type { TSettingsForm } from '@/shared/types/form/scheme.zod';

import { useProfile } from '@/hooks/useProfile';

import { SettingFields } from './settings-form.data';
import { updateProfile } from '@/services/profile/profile-client.service';
import { uploadAvatar } from '@/services/settings/settings.service';

export default function SettingsClientPage() {
	const form = useForm<TSettingsForm>();
	const [selectFile, setSelectFile] = useState<null | string>(null);
	console.log(selectFile);

	const { profile, isLoading } = useProfile();

	useEffect(() => {
		if (!profile) return;
		form.reset({
			name: profile.name!,
			email: profile.email!,
			phone: profile.phone! ?? '',
		});
	}, [profile, form]);

	// mutation
	const { mutate } = useMutation({
		mutationFn: (payload: Partial<TSettingsForm>) => updateProfile(payload),
		onSuccess: () => toast.success('Profile settings is success updates!'),
	});

	// handle
	const handleAddFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		if (!file || !profile) return;
		try {
			const publicUrl = await uploadAvatar(file, profile?.id);
			setSelectFile(publicUrl);
			mutate()
		} catch (error) {
			toast.error('Error by upload file!');
		}
	};

	//  TODO: avatar_path не добавляется, хотя selectFile появляется

	const onSubmitUpdateProfile: SubmitHandler<TSettingsForm> = async data => {
		const dirty = form.formState.dirtyFields;
		const profileFields = Object.fromEntries(
			Object.keys(dirty).map(k => [k, (data as any)[k]])
		) as Partial<TSettingsForm>;
		if (Object.keys(profileFields).length) mutate({ ...profileFields });
	};

	return isLoading ? (
		<Skeleton />
	) : (
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
				<div className='relative h-[300px] w-[300px] rounded-md border-2 p-1'>
					{(selectFile || profile?.avatar_path) && (
						<Image
							className='rounded'
							src={selectFile || profile?.avatar_path}
							alt='imge'
							width={300}
							height={300}
						/>
					)}
					<input
						type='file'
						className='absolute top-1 bottom-1 z-40 h-full w-full text-transparent'
						accept='.jpg,.jpeg,.png,.svg'
						onChange={e => handleAddFile(e)}
					/>
					<Plus
						size={100}
						className='text-gray/90 pointer-events-none absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] transform cursor-pointer'
					/>
				</div>
				<span className='text-gray ml-2 text-[10px]'>Add image for you profile</span>
			</div>
		</div>
	);
}
