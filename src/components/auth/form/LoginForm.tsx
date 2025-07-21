import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { signInWithEmail } from '@/app/(auth)/actions';

import { ZLoginScheme } from '@/shared/types/scheme.zod';

import { PUBLIC_PAGES } from '@/config/public-page.config';

import Form from '../../ui/form/Form';

import { loginFields } from './login.data';

interface Props {
	linkText: string;
	children?: React.ReactNode;
}
export function LoginForm({ linkText, children }: Props) {
	// notification
	const notify = () => {
		toast.success('Link is send your email, please check your email!');
	};
	// react-hook-form
	const {
		reset,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(ZLoginScheme),
	});
	const onSubmit =  (data: any) => {
	signInWithEmail({ email: data.email }).then(()=>{
		reset();
		notify();
	}) 
		
	};

	return (
		<div className='flex flex-col gap-2'>
			<Form
				formElement={loginFields}
				handleOnSubmit={handleSubmit(onSubmit)}
				register={register}
				errors={errors}
				btnText='Login'
				btnClassName='bg-white/40 py-1.5 hover:text-purple-950 duration-300 text-sm 2xl:text-lg px-3 hover:bg-white/60 w-[30%] rounded-4xl  text-white transition-colors'
			/>
			<div className='text-[0.6em]'>
				Don't have on account?
				<Link
					className='ml-1 border-b border-cyan-400 pb-[1px] text-cyan-400'
					href={PUBLIC_PAGES.REGISTER}
				>
					{linkText}
				</Link>
				{children}
			</div>
		</div>
	);
}
