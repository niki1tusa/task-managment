'use client';

import { useQuery } from '@tanstack/react-query';
import { SquarePlus } from 'lucide-react';
import { useMemo } from 'react';

import ChatInput from '@/components/chat-sidebar/ChatInput';
import ChatMessage from '@/components/chat-sidebar/ChatMessage';
import { useChat } from '@/components/chat-sidebar/useChat';
import { Avatar } from '@/components/ui/Avatar';
import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';

import type { TProfileRow } from '@/shared/types/task/task.types';

import ChannelsSide from './ChannelsSide';
import PartySide from './PartySide';
import { getClientChannels } from '@/services/channel/channel-client.service';

interface Props {
	data: TProfileRow;
}
export function MessagesClient({ data }: Props) {
	const { data: channels, isLoading } = useQuery({
		queryKey: ['channels'],
		queryFn: async () => await getClientChannels(),
	});
	console.log(channels);
	const { messages, messagesEndRef, handleSend } = useChat();
	const renderMessages = useMemo(() => {
		return messages.map(m => <ChatMessage key={m.id} message={m} />);
	}, [messages]);

	return (
		<div className='grid h-full w-full grid-cols-[3fr_5fr] border-l-2 bg-gray-50 dark:bg-gray-900'>
			{/* Channel */}
			{isLoading ? <Skeleton length={1}  height='h-screen' /> : <ChannelsSide channels={channels || []} />}

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
							className='text-sidebar-primary/80 dark:text-white text-[0.8rem] 2xl:text-[1rem]'
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
