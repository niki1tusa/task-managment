import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAuthStore } from '@/store/auth.store';

import Form from './Form';
import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

export function AuthForm() {
	const { login } = useAuthStore();
	const router = useRouter();
	// notification
	const notify = () => toast.success();

	//
	// react-hook-form
	const {
		reset,
		handleSubmit,
		register,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(zodScheme),
	});
	const onSubmit = (data: any) => {
		console.log('setting cookie');
		Cookies.set('auth_token', 'my-token', { expires: 7 });
		login('token');
		toast.success('Login successful!');
		router.replace(DASHBOARD_PAGES.DASHBOARD);

		notify();
	};

	return <Form />;
}
