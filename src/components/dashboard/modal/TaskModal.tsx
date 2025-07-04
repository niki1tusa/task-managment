'use client';

import { BookAlert, Bug, FileX2Icon, Plane } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
	children: React.ReactNode;
}
export default function TaskModal({ children }: Props) {
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
	return (
		<div
			onClick={closeModal}
			className='absolute top-[30%] left-[50%] z-50 min-w-md -translate-x-[50%] transform items-center justify-center bg-white text-black'
		>
			<div onClick={e => e.stopPropagation()} className='mx-2 max-h-[90vh] rounded-lg'>
				<div className='bg-background mt-3 flex items-center justify-between p-2'>
					{children}
					<button onClick={closeModal}>x</button>
				</div>
				<div className='flex flex-col my-5 mx-2'>
					<span>
						<label >Title</label>
						<input className='border' type='text' placeholder='' />
					</span>
					<span>
						<label>Due date</label>
						<input className='border' type='date' placeholder='' />
					</span>
					<span className='flex'>
						<Plane/>
						<Bug/>
						<BookAlert/>
						<FileX2Icon/>
					</span>
					<button className='bg-primary rounded-2xl text-white w-[30%]'>Save</button>
				</div>
			</div>
		</div>
	);
}
