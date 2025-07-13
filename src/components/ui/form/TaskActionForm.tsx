// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import Cookies from 'js-cookie';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import type { ZodSchema } from 'zod';

// import { Button } from '@/components/ui/Button';

// import { DASHBOARD_PAGES } from '@/config/dashboard-page.config';

// import { useAuthStore } from '@/store/auth.store';
// import { useTaskStore } from '@/store/task.store';

// import { DateField } from '../field/DateField';
// import { Field } from '../field/Field';
// import { IconField } from '../field/IconField';

// interface Props {
// 	id?: string;
// 	btnText?: string;
// 	isIconField?: boolean;
// 	isTitleField?: boolean;
// 	isEmailField?: boolean;
// 	isPassowrdField?: boolean;
// 	isNameField?: boolean;
// 	isDataField?: boolean;
// 	isLogin?: boolean;
// 	btnClassName?: string;
// 	zodScheme: ZodSchema;
// 	closeModal?: () => void;
// 	isEditTask?: boolean;
// 	isAddSubTask?: boolean;
// 	successMessage?: string;
// }
// export default function Form({
// 	id,
// 	btnText,
// 	zodScheme,
// 	successMessage = 'Task edit is success!',
// 	btnClassName = '',
// 	isLogin = false,
// 	isIconField = false,
// 	isNameField = false,
// 	isTitleField = false,
// 	isEmailField = false,
// 	isPassowrdField = false,
// 	isDataField = false,

// 	isEditTask = false,
// 	isAddSubTask = false,
// 	closeModal,
// }: Props) {
// 	// store
// 	const tasks = useTaskStore(state => state.tasks);
// 	const editTask = useTaskStore(state => state.editTask);
// 	const addSubTask = useTaskStore(state => state.addSubTask);

// 	const router = useRouter();
// 	// notification
// 	const notify = () => toast.success(successMessage);

// 	// find task
// 	const findTask = tasks.find(task => task.id === id);
// 	//
// 	// react-hook-form
// 	const {
// 		reset,
// 		handleSubmit,
// 		register,
// 		control,
// 		setValue,
// 		watch,
// 		formState: { errors },
// 	} = useForm({
// 		resolver: zodResolver(zodScheme),
// 	});

// 	const onSubmit = (data: any) => {
// 		if (id && isEditTask) {
// 			editTask(id, data);
// 		} else if (id && isAddSubTask) {
// 			addSubTask(id, data);
// 		}

// 		notify();
// 		setTimeout(() => {
// 			if (closeModal) {
// 				closeModal();
// 			} else if (router) {
// 				router.back();
// 			}
// 		}, 1000);
// 	};

// 	useEffect(() => {
// 		if (findTask && isEditTask) {
// 			reset({
// 				title: findTask.title,
// 				due: {
// 					date: new Date(findTask.due.date),
// 				},
// 				iconTheme: findTask.iconTheme,
// 			});
// 		}
// 	}, [id, reset, findTask]);
// 	return (
// 		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-0.5 2xl:gap-2'>
// 			{[
// 				isTitleField && {
// 					labelText: 'Title',
// 					registerName: 'title',
// 					placeholderText: 'Enter title',
// 					type: 'text',
// 				},
// 				isNameField && {
// 					labelText: 'Name',
// 					registerName: 'name',
// 					placeholderText: 'Your name',
// 					type: 'text',
// 				},
// 				isEmailField && {
// 					labelText: 'Email',
// 					registerName: 'email',
// 					placeholderText: 'example@email.com',
// 					type: 'email',
// 				},
// 				isPassowrdField && {
// 					labelText: 'Password',
// 					registerName: 'password',
// 					placeholderText: 'Enter password',
// 					type: 'password',
// 				},
// 			]
// 				.filter(item => item)
// 				.map(item => (
// 					<Field
// 						register={register}
// 						labelText={item.labelText}
// 						registerName='title'
// 						placeholderText='Enter title'
// 						type='text'
// 						errors={errors}
// 					/>
// 				))}
// 			<Button type='submit' className={btnClassName}>
// 				{btnText}
// 			</Button>
// 		</form>
// 	);
// }
