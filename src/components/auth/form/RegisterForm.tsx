import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { type TRegistrationForm, ZRegistrationScheme } from '@/shared/types/form/scheme.zod';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';
import { PUBLIC_PAGES } from '@/config/public-page.config';

import Form from '../../ui/form/Form';

import { RegisterFields } from './register.data';
import { fetchCreateUser } from '@/services/profile/user-client.service';

interface Props {
	linkText: string;
}
export function RegisterForm({ linkText }: Props) {
	const router = useRouter();
	const {
		reset,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<TRegistrationForm>({
		resolver: zodResolver(ZRegistrationScheme),
	});
	const { mutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: (payload: TRegistrationForm) => fetchCreateUser(payload),
	});
	const onSubmit: SubmitHandler<TRegistrationForm> = data => {
		try {
			mutate(data)
			reset();
			console.log(data);
			toast.success('Successfully registration!');
			setTimeout(() => {
				router.replace(DASHBOARD_PAGES.DASHBOARD);
			}, 1500);
		} catch (error) {
			console.error(error);
			console.error(errors);
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			<Form<TRegistrationForm>
				formElement={RegisterFields}
				handleOnSubmit={handleSubmit(onSubmit)}
				register={register}
				errors={errors}
				btnText='Register'
				btnClassName='bg-white/40 py-1.5 hover:text-purple-950 duration-300 text-sm 2xl:text-lg px-3 hover:bg-white/60 w-[30%] rounded-4xl  text-white transition-colors'
			/>
			<div className='text-[0.6em]'>
				Already on account?
				<Link
					className='ml-1 border-b border-cyan-400 pb-[1px] text-cyan-400'
					href={PUBLIC_PAGES.LOGIN}
				>
					{linkText}
				</Link>
			</div>
		</div>
	);
}
