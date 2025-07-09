'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SquareX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import { Button } from '@/components/ui/Button';
import Form from '@/components/ui/Form';

import { useTaskStore } from '@/store/store';

import Header from '../header-modals/Header';
import { ZSubTaskScheme } from '../scheme.zod';
import { WrapperModal } from '../Wrapper.modal';

interface Props {
	id: string;
}
type TForm = { title: string };
export default function SubTaskModal({ id }: Props) {
	const addSubTask = useTaskStore(state => state.addSubTask);
	const notify = () => toast.success('Create subtask is success!');
	const router = useRouter();
	const closeModal = () => router.back();

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []);

	// react-hook-form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TForm>({
		resolver: zodResolver(ZSubTaskScheme),
	});
	const onSubmit: SubmitHandler<TForm> = data => {
		addSubTask(id, data);
		console.log(data);
		notify();
		setTimeout(() => {
			closeModal();
		}, 2000);
	};

	return (
		<WrapperModal closeModal={closeModal}>
			<div
				onClick={e => e.stopPropagation()}
				className='fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 text-black shadow-lg'
			>
				<Header title={`Add Subtask "${id}"`} closeModal={closeModal} />
				<Form btnText='Save' closeModal={closeModal} isTitleField={true} />
			</div>
		</WrapperModal>

		
	);
}
