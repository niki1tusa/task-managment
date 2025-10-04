'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { serverSignOut } from '@/app/(auth)/actions';

import { Title } from '@/components/ui/Title';
import { PUBLIC_PAGES } from '@/components/ui/config/public-page.config';
import Form from '@/components/ui/form/Form';

import { type TResetPasswordForm, ZResetPasswordScheme } from '@/shared/types/form/scheme.zod';

import { resetPassowrdFields } from './reset-password.data';
import { updateUserPassword } from '@/services/profile/profile-auth-client.service';

export function ResetPassowrdClient() {
	const router = useRouter();
	// react-hook-form
	const {
		reset,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<TResetPasswordForm>({
		resolver: zodResolver(ZResetPasswordScheme),
	});
	// mutation
	const { mutateAsync } = useMutation({
		mutationFn: (payload: string) => updateUserPassword(payload),
	});
	// submit
	const onSubmit: SubmitHandler<TResetPasswordForm> = async data => {
		try {
			await mutateAsync(data.password);
			await serverSignOut();
			toast.success('New password has been set!');
			reset();
			router.replace(PUBLIC_PAGES.LOGIN);
		} catch (e: any) {
			toast.error(e?.message || 'Could not update password. Try again.');
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			<Title>
				<b className='font-playfair text-3xl 2xl:text-6xl'>Set a new password</b>
			</Title>
			<Form<TResetPasswordForm>
				formElement={resetPassowrdFields}
				handleOnSubmit={handleSubmit(onSubmit)}
				register={register}
				errors={errors}
				btnText='Save new password'
				btnClassName='bg-white/40 py-1.5 hover:text-purple-950 duration-300 text-sm 2xl:text-lg w-[50%] hover:bg-white/60  rounded-4xl  text-white transition-all whitespace-nowrap'
			/>

			{/*  */}
			<div className='text-[0.6em]'>
				Don&apos;t have an account?
				<Link
					className='ml-1 border-b border-cyan-400 pb-[1px] text-cyan-400'
					href={PUBLIC_PAGES.REGISTER}
				>
					Register…
				</Link>
			</div>
			<div className='text-[0.6em]'>
				Back to login?
				<Link
					className='ml-1 border-b border-cyan-400 pb-[1px] text-cyan-400'
					href={PUBLIC_PAGES.LOGIN}
				>
					Sign In…
				</Link>
			</div>
		</div>
	);
}
