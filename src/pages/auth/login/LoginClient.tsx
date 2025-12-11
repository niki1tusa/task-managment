'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
	signInWithEmail,
	signInWithGithub,
	signInWithGoogle,
	signInWithLinkedIn,
} from '@/app/(auth)/actions';

import { PUBLIC_PAGES } from '@/shared/config/public-page-config';
import {
	type TLoginForm,
	type TLoginPhonePasswordForm,
	ZLoginPhonePasswordScheme,
	ZLoginScheme,
} from '@/shared/model/scheme';
import { Title } from '@/shared/ui/Title';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/animate-ui/radix/tabs';
import { BtnTabLink } from '@/shared/ui/buttons/BtnTabLink';

import { loginEmailFields, loginPhonePasswordFields } from './login-config';
import { loginUserByPhoneAndPassword } from '@/entities/profile/api/profile-auth-client-service';
import Form from '@/widgets/form/Form';

export function LoginClient() {
	const [loginType, setLoginType] = useState<'email' | 'password'>('email');

	// react-hook-form:
	// email magic link
	const emailForm = useForm<TLoginForm>({ resolver: zodResolver(ZLoginScheme) });

	// phone + password
	const phoneForm = useForm<TLoginPhonePasswordForm>({
		resolver: zodResolver(ZLoginPhonePasswordScheme),
	});
	// mutation:
	const { mutateAsync } = useMutation({
		mutationFn: (payload: TLoginPhonePasswordForm) => loginUserByPhoneAndPassword(payload),
	});
	// submit:
	const onSubmitEmail: SubmitHandler<TLoginForm> = async ({ email }) => {
		try {
			await signInWithEmail({ email });
			toast.success('If the address exists, we sent a magic link. Check your inbox.');
			emailForm.reset();
		} catch {
			toast.error('Could not send magic link. Please try again.');
		}
	};
	const onSubmitPhone: SubmitHandler<TLoginPhonePasswordForm> = async ({ phone, password }) => {
		try {
			await mutateAsync({ phone, password });
			toast.success('Signed in!');
		} catch (e: unknown) {
			const error = e as { message?: string };
			toast.error(error?.message || 'Invalid phone or password.');
		}
	};
	return (
		<div className='flex flex-col gap-2'>
			<Title>
				<b className='font-playfair text-3xl 2xl:text-6xl'>
					Welcome back <br />
					<span className='text-xl 2xl:text-4xl'>To the task management app</span>
				</b>
			</Title>
			{/* tabs */}
			<div className='mt-5 flex flex-col gap-3'>
				<span className='text-base'>Choice login type:</span>
				<Tabs
					className='rounded-sm shadow-sm'
					value={loginType}
					onValueChange={v => setLoginType(v as 'email' | 'password')}
				>
					<TabsList className='bg-primary/50 flex w-full'>
						<TabsTrigger
							value='email'
							className='flex data-[state=active]:text-black data-[state=inactive]:text-white'
						>
							Email
						</TabsTrigger>
						<TabsTrigger
							value='password'
							className='flex data-[state=active]:text-black data-[state=inactive]:text-white'
						>
							Password
						</TabsTrigger>
					</TabsList>
				</Tabs>
				{/* forms */}
				{loginType === 'password' ? (
					<Form<TLoginPhonePasswordForm>
						formElement={loginPhonePasswordFields}
						handleOnSubmit={phoneForm.handleSubmit(onSubmitPhone)}
						register={phoneForm.register}
						errors={phoneForm.formState.errors}
						btnText='Login'
						btnClassName='bg-primary/50 py-1.5 hover:text-purple-950 duration-300 text-sm 2xl:text-lg px-2 hover:bg-white/60 w-[30%] rounded-4xl text-white transition-all whitespace-nowrap disabled:opacity-60'
					/>
				) : (
					<Form<TLoginForm>
						formElement={loginEmailFields}
						handleOnSubmit={emailForm.handleSubmit(onSubmitEmail)}
						register={emailForm.register}
						errors={emailForm.formState.errors}
						isEmailVariant={true}
						btnText='Send magic link'
						btnClassName='bg-primary/50 py-1.5 hover:text-purple-950 duration-300 text-sm 2xl:text-lg px-4 hover:bg-white/60 w-auto rounded-4xl text-white transition-all whitespace-nowrap'
					/>
				)}
			</div>
			{/*  */}
			<div className='text-gray flex items-center gap-1 text-[0.6em]'>
				<span className='w-full border-b' />
				<span className='text-[0.8em] whitespace-nowrap'>Or continue with</span>
				<span className='w-full border-b' />
			</div>
			{/*  */}
			<div className='my-5 flex justify-center gap-3'>
				<BtnTabLink path='/icons/google.svg' onClick={signInWithGoogle} />
				<BtnTabLink path='/icons/github.svg' onClick={signInWithGithub} />
				<BtnTabLink path='/icons/linkedIn.svg' onClick={signInWithLinkedIn} />
			</div>
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
				Forgot password?
				<Link
					className='ml-1 border-b border-cyan-400 pb-[1px] text-cyan-400'
					href={PUBLIC_PAGES.DROP_PASSWORD}
				>
					Drop password…
				</Link>
			</div>
		</div>
	);
}
