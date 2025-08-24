'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { signInWithEmail, signInWithGoogle } from '@/app/(auth)/actions';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import { Title } from '@/components/ui/Title';
import { BtnTabLink } from '@/components/ui/button/BtnTabLink';

import {
	type TLoginForm,
	type TLoginPhonePasswordForm,
	ZLoginPhonePasswordScheme,
	ZLoginScheme,
} from '@/shared/types/form/scheme.zod';

import { PUBLIC_PAGES } from '@/config/public-page.config';

import Form from '../../ui/form/Form';

import { loginEmailFields, loginPhonePasswordFields } from './login.data';
import { loginUserByPhoneAndPassword } from '@/services/profile/user-client.service';

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
			// TODO: router.replace('/dashboard')
		} catch (e: any) {
			toast.error(e?.message || 'Invalid phone or password.');
		}
	};
	return (
		<div className='flex flex-col gap-2'>
			<Title>
				<b className='font-playfair text-3xl 2xl:text-6xl'>
					Welcome to the <span className='text-4xl'>task management app</span>
				</b>
			</Title>
			{/* tabs */}
			<div className='mt-5'>
				<span className='text-base'>Choice login type:</span>
				<Tabs defaultValue='email' className='bg-primary shadow-sm'>
					<TabsList className='grid w-full grid-cols-2 rounded '>
						<TabsTrigger onClick={() => setLoginType('email')} value='email'>
							Email
						</TabsTrigger>
						<TabsTrigger onClick={() => setLoginType('password')} value='password'>
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
						btnClassName='bg-white/40 py-1.5 hover:text-purple-950 duration-300 text-sm 2xl:text-lg px-2 hover:bg-white/60 w-[30%] rounded-4xl text-white transition-all whitespace-nowrap disabled:opacity-60'
					/>
				) : (
					<Form<TLoginForm>
						formElement={loginEmailFields}
						handleOnSubmit={emailForm.handleSubmit(onSubmitEmail)}
						register={emailForm.register}
						errors={emailForm.formState.errors}
						isEmailVariant={true}
						btnText='Send magic link'
						btnClassName='bg-white/40 py-1.5 hover:text-purple-950 duration-300 text-sm 2xl:text-lg px-2 hover:bg-white/60 w-[30%] rounded-4xl text-white transition-all whitespace-nowrap'
					/>
				)}
			</div>
			{/*  */}
			<div className='text-gray mt-8 flex items-center gap-1 text-[0.6em]'>
				<span className='w-full border-b' />
				<span className='text-[0.8em] whitespace-nowrap'>Or continue with</span>
				<span className='w-full border-b' />
			</div>
			{/*  */}
			<div className='my-5 flex justify-center gap-3'>
				<BtnTabLink path='/google.svg' onClick={signInWithGoogle} />
				<BtnTabLink path='/meta.svg' />
				<BtnTabLink path='/github.svg' />
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
