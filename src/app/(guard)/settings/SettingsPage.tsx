'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle, Plus } from 'lucide-react';
import Image from 'next/image';
import { type ChangeEvent, useEffect, useState } from 'react';
import { type FieldNamesMarkedBoolean, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/button/Button';
import Form from '@/components/ui/form/Form';

import type { TSettingsForm } from '@/shared/types/scheme';

import { useProfile } from '@/hooks/useProfile';

import { SettingFields } from './settings-form.data';
import { updateProfile } from '@/services/profile/profile-client-service';
import {
	deleteAvatarPathInProfile,
	updateAvatarPathInProfile,
	uploadAvatar,
} from '@/services/settings-service';

export default function SettingsClientPage() {
	const form = useForm<TSettingsForm>();
	const queryClient = useQueryClient();
	const [, setSelectFile] = useState<null | string>(null);
	const { profile, isLoading } = useProfile();

	useEffect(() => {
		if (!profile) return;
		form.reset({
			name: profile.name!,
			occupation: profile.occupation!,
			email: profile.email!,
			phone: profile.phone! ?? '',
		});
	}, [profile, form]);

	// mutation
	const { mutate, isPending: isProfileUpdatePending } = useMutation({
		mutationFn: (payload: Partial<TSettingsForm>) => updateProfile(payload),
		onSuccess: () => toast.success('Profile settings is success updates!'),
	});
	const { mutate: avatarMutate, isPending } = useMutation({
		mutationFn: (payload: string) => updateAvatarPathInProfile(payload),
		onSuccess: () => {
			toast.success('Profile avatar settings is success updates!');
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
	});
	const { mutate: deleteAvatarMutate, isPending: isDeletePending } = useMutation({
		mutationFn: () => deleteAvatarPathInProfile(),
		onSuccess: () => {
			toast.success('Profile avatar is success remove!');
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
	});
	// handle
	const handleAddFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		if (!file || !profile) return;
		try {
			const publicUrl = await uploadAvatar(file, profile.id);
			setSelectFile(publicUrl);
			avatarMutate(publicUrl);
		} catch (error) {
			toast.error(`Error by upload file! ${error}`);
		} finally {
			(e.target as HTMLInputElement).value = '';
		}
	};

	const handleRemoveAvatar = () => {
		deleteAvatarMutate();
		setSelectFile(null);
	};
	const onSubmitUpdateProfile: SubmitHandler<TSettingsForm> = data => {
		const dirty = form.formState.dirtyFields as FieldNamesMarkedBoolean<TSettingsForm>;
		const profileFields = (Object.keys(dirty) as (keyof TSettingsForm)[])
			.filter(k => (dirty as Record<string, boolean>)[k])
			.reduce((acc, k) => ({ ...acc, [k]: data[k] }), {} as Partial<TSettingsForm>);
		if (Object.keys(profileFields).length) mutate(profileFields);
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
						isPending={isProfileUpdatePending}
						btnText='Save'
					/>
				</div>
			</div>
			{/* right side */}
			<div>
				<div className='relative h-[300px] w-[300px] rounded-md border-2 p-1'>
					{profile?.avatar_path && (
						<Image
							className='rounded'
							src={profile.avatar_path}
							alt='avatar'
							width={300}
							height={300}
						/>
					)}
					<input
						type='file'
						className='absolute top-1 bottom-1 z-40 h-full w-full text-transparent'
						accept='.jpg,.jpeg,.png,.svg'
						onChange={e => handleAddFile(e)}
						disabled={isPending}
					/>
					<Plus
						size={100}
						className='text-gray/90 pointer-events-none absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] transform cursor-pointer'
					/>
				</div>
				<div className='flex flex-col gap-10'>
					<span className='text-gray ml-2 text-[10px]'>Add image for you profile</span>
					<Button disable={isDeletePending} onClick={handleRemoveAvatar} >
						{isDeletePending ? <LoaderCircle className='animate-spin' /> : 'Remove image'}
					</Button>
				</div>
			</div>
		</div>
	);
}
