'use client';

import { useModalStore } from '@/shared/store/modals-store';

export default function BtnCreateTask() {
	const { open } = useModalStore();
	return (
		<button
			type='button'
			onClick={() => {
				open('createTask');
			}}
			className='hover:text-primary bg-side shadow-default mb-4 flex items-center rounded-sm px-2 text-sm font-medium text-gray-500 transition-all duration-300 dark:hover:text-white'
		>
			+ Add Task
		</button>
	);
}
