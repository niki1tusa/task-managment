import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import type { FormElement, IForm } from '@/components/ui/form/form.types';

import { ZLoginScheme, ZRegistrationScheme } from '@/shared/types/scheme.zod';

import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

import { useAuthStore } from '@/store/auth.store';

import Form from '../../ui/form/Form';

type TAuth = 'register' | 'login';
interface Props {
	authCondition: TAuth;
	formElement: FormElement[];
	setAuthCondition: (arg: TAuth) => void;
	linkText: string;
	children?: React.ReactNode;
}
export function AuthForm({
	linkText,
	children,
	authCondition,
	setAuthCondition,
	formElement,
}: Props) {
	const { login } = useAuthStore();
	const router = useRouter();
	// notification
	const notify = () => {
		toast.success(
			authCondition === 'register' ? 'Successfully registration' : 'Successfully logged!'
		);
	};
	// react-hook-form
	const {
		reset,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(authCondition === 'register' ? ZRegistrationScheme : ZLoginScheme),
	});
	const onSubmit = (data: any) => {
		console.log('setting cookie');
		Cookies.set('auth_token', 'my-token', { expires: 7 });
		login('token');
		reset();
		notify();
		setTimeout(() => {
			router.replace(DASHBOARD_PAGES.DASHBOARD);
		}, 1500);
	};

	return (
		<div className='flex flex-col gap-2'>
			<Form
				formElement={formElement}
				handleOnSubmit={handleSubmit(onSubmit)}
				register={register}
				errors={errors}
				btnText='Login'
				btnClassName='bg-white/40 py-1.5 hover:text-purple-950 duration-300 text-sm 2xl:text-lg px-3 hover:bg-white/60 w-[30%] rounded-4xl  text-white transition-colors'
			/>
			<div className='text-[0.6em]'>
				{linkText === 'Sign Up' ? "Don't have on account?" : 'Already have on account?'}
				<button
					className='ml-1 border-b border-cyan-400 pb-[1px] text-cyan-400'
					onClick={() => setAuthCondition(linkText === 'Sign Up' ? 'register' : 'login')}
				>
					{linkText}
				</button>
				{children}
			</div>
		</div>
	);
}
