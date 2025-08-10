'use client';

import clsx from 'clsx';
import { useMemo } from 'react';

import ChatInput from '@/components/chat-sidebar/ChatInput';
import ChatMessage from '@/components/chat-sidebar/ChatMessage';
import { useChat } from '@/components/chat-sidebar/useChat';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task/task.types';

interface Props {
	data: TProfileRow;
	channels: {
		title: string;
	}[];
}
export function MessagesClient({ data, channels }: Props) {
	const { messages, messagesEndRef, handleSend } = useChat();
	const renderMessages = useMemo(() => {
		return messages.map(m => <ChatMessage key={m.id} message={m} />);
	}, [messages]);

	return (
		<div className='grid h-full w-full grid-cols-[1fr_3fr] border-l-2 bg-gray-50 dark:bg-gray-900'>
			{/* Channel */}
			<div className='border-r-2'>
				<div className='mt-7 ml-5'>
					<Title heading='page'>Channel</Title>
				</div>
				<div className='mt-1 border-t-2' />
				<div className='mt-5 ml-5 flex flex-col items-start gap-2'>
					{channels.map((channel, i) => (
						<Button
							className={clsx(
								'bg-primary rounded-sm px-2 py-2 text-sm shadow shadow-neutral-400 transition-colors 2xl:text-lg dark:text-white',
								i < 1
									? 'bg-primary text-white'
									: 'bg-primary/40 text-primary hover:bg-primary/50 dark:text-white/40'
							)}
							key={i}
						>
							# {channel.title}
						</Button>
					))}
				</div>
			</div>
			{/* Chat */}
			<div className='flex h-screen flex-col' role='complementary' aria-label='Chat panel'>
				{/* User info */}
				<div className='bg-primary/40 flex h-[69.5px] w-full flex-shrink-0 items-center gap-3 pl-10 font-semibold 2xl:h-30'>
					<Avatar img={data.avatar_path || ''} />
					<div className='flex flex-col '>
						<div className='text-[1rem] 2xl:text-[1.2rem]' id='chat-user-name'>
							<span className='relative'>
								{data.name}
								<div className='absolute top-0.5 -right-[9px] h-2 w-2 animate-pulse rounded-full border border-green-900 bg-green-500' />
							</span>
							<div className='absolute top-0.5 -right-[9px] h-2 w-2 animate-pulse rounded-full border border-green-900 bg-green-500' />
						</div>
						<div className='text-[0.8rem] 2xl:text-[1rem] text-sidebar-primary/80' aria-label='User occupation'>
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
			</div>
		</div>
	);
}
