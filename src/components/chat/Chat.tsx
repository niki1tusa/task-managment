'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Paperclip, Send } from 'lucide-react';
import Image from 'next/image';


import { Avatar } from '../dashboard/last-tasks/task/header/Avatar';
import Skeleton from '../ui/Skeleton';

import { getProfile } from '@/services/profile/profile-client.service';
import { PROFILES } from '@/shared/data/profile.data';

export default function Chat() {
	 const profile =  PROFILES
	const { data, isPending } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
	});
	const messages = [
		{
			id: 1,
			text: 'Hi, have you already completed your work?',
			author: profile[1],
			own: false,
			time: '09:30',
		},
		{
			id: 2,
			text: "I'm working on the final touches. Will send it soon!",
			author: profile[0],
			own: true,
			time: '09:31',
		},
		{
			id: 3,
			text: "Awesome, can't wait to see it. Let me know if you need feedback.",
			author: profile[1],
			own: false,
			time: '09:32',
		},
		{
			id: 4,
			text: 'Sure, thank you!',
			author: profile[0],
			own: true,
			time: '09:33',
		},
	];
	// TODO: чат должен быть на месте
	return (
		<aside className='text-chat-foreground z-10 flex h-full w-full flex-col items-center'>
			{/* image */}

			<Image
				alt='chat'
				src='/chat.jpg'
				width={575}
				height={100}
				className='chat-header-img flex-shrink-0'
			/>
			<div className='grid w-full grid-rows-2'>
				{/* user */}
				<div className='bg-primary/40 flex h-16 w-full items-center gap-3 pl-10 font-semibold 2xl:h-30'>
					{isPending ? (
						<Skeleton />
					) : (
						<>
							<Avatar img={data.avatar_path} />
							<div className='flex flex-col'>
								<div className='text-[1rem] lg:text-[1.2rem]'>{data.name}</div>
								<div className='text-[0.8rem] lg:text-[1rem]'>occupation</div>
							</div>
						</>
					)}
				</div>
				{/* chat */}
				<div className='flex-1 overflow-y-auto px-2 py-2'>
					{isPending ? (
						<Skeleton length={2} />
					) : (
						<div className='flex flex-col gap-3'>
							{messages.map((m, i) => (
								<div
									key={`${m.id}-${i}`}
									className={clsx('flex items-end gap-2', m.own ? 'justify-end' : 'justify-start')}
								>
									{!m.own && <Avatar img={m.author.img} />}
									<div className='max-w-[70%]'>
										<div className='mb-0.5 text-[0.9rem]'>
											<span className='mr-1 opacity-80'>{m.own ? 'Me' : m.author.name}</span>
											<span className='opacity-50'>{m.time}</span>
										</div>
										<div
											className={clsx(
												'px-3 py-2',
												m.own
													? 'rounded-lg rounded-br-none bg-indigo-500'
													: 'rounded-lg rounded-bl-none bg-indigo-300'
											)}
										>
											{m.text}
										</div>
									</div>
									{m.own && data.avatar_path && <Avatar img={data.avatar_path} />}
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			{/* field */}
			<span className='bg-primary/40 mt-3 flex w-full items-center justify-between px-8 py-3'>
				<div className='flex gap-2'>
					<button type='button'>
						<Paperclip />
					</button>
					<input type='text' placeholder='Enter your message...' />
				</div>
				<button className='relative h-10 w-10 rounded-full bg-indigo-400 transition-colors hover:opacity-80'>
					<Send className='absolute top-[25%] right-[23%]' />
				</button>
			</span>
		</aside>
	);
}
