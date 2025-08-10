'use client';

import clsx from 'clsx';
import { SquarePlus } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import ChatInput from '@/components/chat-sidebar/ChatInput';
import ChatMessage from '@/components/chat-sidebar/ChatMessage';
import { useChat } from '@/components/chat-sidebar/useChat';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task/task.types';

import type { TChannelRow } from './channel.types';

interface Props {
	data: TProfileRow;
	channels: TChannelRow[];
}
export function MessagesClient({ data, channels }: Props) {
	console.log(channels)
	const { messages, messagesEndRef, handleSend } = useChat();
	const renderMessages = useMemo(() => {
		return messages.map(m => <ChatMessage key={m.id} message={m} />);
	}, [messages]);
	const [sortType, setSortType] = useState<string>('all');
	const sortedChannels =
		sortType === 'all' ? channels : channels.filter(channel => channel.type === sortType);
	return (
		<div className='grid h-full w-full grid-cols-[1fr_3fr] border-l-2 bg-gray-50 dark:bg-gray-900'>
			{/* Channel */}
			<div className='border-r-2'>
				<div className='mx-5 mt-7 flex items-center justify-between'>
					<Title heading='page'>Channels</Title>
					<SquarePlus />
				</div>
				<div className='mt-1 border-t-2' />
				<Tabs defaultValue='All' className='dark:bg-muted bg-gray w-full'>
					<TabsList className='grid w-full grid-cols-3 rounded-none border-b-2'>
						<TabsTrigger onClick={() => setSortType('all')} value='All'>
							All
						</TabsTrigger>
						<TabsTrigger onClick={() => setSortType('group')} value='Group'>
							Group
						</TabsTrigger>
						<TabsTrigger onClick={() => setSortType('direct')} value='Direct'>
							Direct
						</TabsTrigger>
					</TabsList>
				</Tabs>
				<div className='mt-5 ml-5 flex flex-col items-start gap-2'>
					{sortedChannels.map((channel, i) => (
						<Button
							className={clsx(
								'bg-primary rounded-sm px-2 py-2 text-sm shadow shadow-neutral-400 transition-colors 2xl:text-lg dark:text-white',
								i < 1
									? 'bg-primary text-white'
									: 'bg-primary/40 text-primary hover:bg-primary/50 dark:text-white/40'
							)}
							key={i}
						>
							# {channel.name}
						</Button>
					))}
				</div>
			</div>
			{/* Chat */}
			<div className='flex h-screen flex-col' role='complementary' aria-label='Chat panel'>
				{/* User info */}
				<div className='bg-primary/40 flex h-[69.5px] w-full flex-shrink-0 items-center gap-3 pl-10 font-semibold 2xl:h-30'>
					<Avatar img={data.avatar_path || ''} />
					<div className='flex flex-col'>
						<div className='text-[1rem] 2xl:text-[1.2rem]' id='chat-user-name'>
							<span className='relative'>
								{data.name}
								<div className='absolute top-0.5 -right-[9px] h-2 w-2 animate-pulse rounded-full border border-green-900 bg-green-500' />
							</span>
						</div>
						<div
							className='text-sidebar-primary/80 text-[0.8rem] 2xl:text-[1rem]'
							aria-label='User occupation'
						>
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
