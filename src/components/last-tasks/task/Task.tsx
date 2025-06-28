import { Image, Link, MessageSquareText, Pencil } from 'lucide-react';

import type { ITask } from '../../../types/task.types';

import { Header } from './Header';
import { StatusBar } from './StatusBar';

export const Task = ({ task }: { task: ITask }) => {
	return (
		<div className=' text-sm rounded-3xl bg-white flex flex-col gap-5 shadow shadow-neutral-400'>
			{/* 1 section */}
			<Header task={task} />
			{/* 2 section */}
			<StatusBar status={task.status} />
			{/* 3 section */}
			<div className='flex justify-between items-center mx-5'>
				<div className='flex gap-2 justify-between'>
					<div className='flex '>
						<MessageSquareText size={19} />
						{task.comment}
					</div>
					<div className='flex'>
						<Image size={19} />
						{task.saveCount}
					</div>
					<div className='flex '>
						<Link size={19} />
						{task.link}
					</div>
				</div>
				<div className='flex gap-2 mb-2 mr-2'>
					<button className='bg-blueviolet text-2xl text-white rounded-full w-9 h-9'>+</button>
					<button className='bg-blueviolet  text-white rounded-full w-9 h-9 flex justify-center items-center'>
						<Pencil size={21} />
					</button>
				</div>
			</div>
		</div>
	);
};
