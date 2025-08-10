'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import type { TProfileRow } from '@/shared/types/task/task.types';


import { Avatar } from '../ui/Avatar';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { useChat } from './useChat';

// TODO: проверить chatMessage и добавить каналы (общий, бухгалтерия, )
export default function Chat({ data }: { data: TProfileRow }) {
	const { messages, messagesEndRef, handleSend } = useChat();
	const renderMessages = useMemo(() => {
		return messages.map(m => <ChatMessage key={m.id} message={m} />);
	}, [messages]);
	return (
		<aside
			className='fixed z-10 flex h-screen flex-col'
			role='complementary'
			aria-label='Chat panel'
		>
			{/* Header image */}

			<div className='h-[300px] w-full' role='img' aria-label='Chat header background'>
				<Image
					alt='Chat header background'
					src='/chat.jpg'
					width={305}
					height={100}
					className='chat-header-img h-full w-full object-cover'
				/>
			</div>

			{/* User info */}
			<div className='bg-primary/40 flex h-[69.5px] w-full flex-shrink-0 items-center gap-3 border-b-2 pl-10 font-semibold 2xl:h-30'>
				<Avatar img={data.avatar_path || ''} />
				<div className='flex flex-col'>
					<div className='text-[1rem] 2xl:text-[1.2rem]' id='chat-user-name'>
						{data.name}
					</div>
					<div className='text-[0.8rem] 2xl:text-[1rem]' aria-label='User occupation'>
						{data.occupation}
					</div>
				</div>
			</div>

			{/* Messages */}
			<div
				className='flex-1 overflow-y-auto px-2 py-2'
				role='log'
				aria-label='Chat messages'
				aria-live='polite'
			>
				<div className='flex flex-col gap-3'>
					{renderMessages}
					<div ref={messagesEndRef} aria-hidden='true' />
				</div>
			</div>

			{/* Input field */}
			<ChatInput handleSend={handleSend} />
		</aside>
	);
}
