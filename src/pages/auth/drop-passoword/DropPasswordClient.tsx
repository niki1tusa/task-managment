'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { sendResetPasswordEmail } from '@/app/(auth)/actions';

import { type TDropPasswordForm, ZDropPasswordScheme } from '@/shared/model/scheme';
import { Title } from '@/shared/ui/Title';
import BtnReturnBack from '@/shared/ui/buttons/BtnReturnBack';

import Form from '@/widgets/form/Form';

import { dropPasswordFields } from './drop-password-config';

export function DropPasswordClient() {
	// react-hook-form
	const {
		reset,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<TDropPasswordForm>({
		resolver: zodResolver(ZDropPasswordScheme),
	});
	const onSubmit: SubmitHandler<TDropPasswordForm> = data => {
		sendResetPasswordEmail(data.email)
			.then(() => {
				toast.success('Link is send your email, please check your email!');
			})
			.catch(error => {
				toast.error(`Fail is send link. Error: ${error.message}`);
			})
			.finally(() => {
				reset();
			});
	};

	return (
		<div className='flex flex-col gap-2'>
			<Title>
				<b className='font-playfair text-3xl 2xl:text-6xl'>Drop a password</b>
			</Title>
			<Form<TDropPasswordForm>
				formElement={dropPasswordFields}
				handleOnSubmit={handleSubmit(onSubmit)}
				register={register}
				errors={errors}
				btnText='Send magic link'
				btnClassName='bg-white/40 py-1.5 hover:text-purple-950 duration-300 text-sm 2xl:text-lg px-2 hover:bg-white/60 w-[30%] rounded-4xl  text-white transition-all whitespace-nowrap'
			/>
			<BtnReturnBack text='Back' />
		</div>
	);
}
