import { useMemo } from 'react';

import { Avatar } from '@/components/ui/Avatar';
import ChatInput from '@/components/ui/chat/ChatInput';
import ChatMessage from '@/components/ui/chat/ChatMessage';
import { useChat } from '@/components/ui/chat/useChat';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { useChannelStore } from '@/store/channel.store';

import { GROUP_GAP_MINUTES, minsDiff } from './messageUtils';

interface Props {
	profile: TProfileRow;
}

export default function Chat({ profile }: Props) {
	const { activeChannel } = useChannelStore();

	const chat = useChat(activeChannel ? activeChannel.id : null);
	const renderMessages = useMemo(() => {
		if (!chat) return null;
		return chat.messages.map((m, i) => {
			const prev = chat.messages[i - 1];
			const next = chat.messages[i + 1];
			const sameAsPrev =
				!!prev &&
				prev.user_id === m.user_id &&
				minsDiff(prev.created_at!, m.created_at!) <= GROUP_GAP_MINUTES;

			const sameAsNext =
				!!next &&
				next.user_id === m.user_id &&
				minsDiff(next.created_at!, m.created_at!) <= GROUP_GAP_MINUTES;
			const isFirstInGroup = !sameAsPrev;
			const isLastInGroup = !sameAsNext;
			return (
				<ChatMessage
					key={m.id}
					message={m}
					isFirstInGroup={isFirstInGroup}
					isLastInGroup={isLastInGroup}
				/>
			);
		});
	}, [chat?.messages]);
	return (
		<div className='flex h-screen flex-col' role='complementary' aria-label='Chat panel'>
			{/* User info */}
			<div className='bg-primary/40 border-gray/20 flex h-[69.5px] w-full flex-shrink-0 items-center gap-3 border-b-2 pl-10 font-semibold shadow-sm 2xl:h-30'>
				<div className='relative'>
					<Avatar img={profile.avatar_path || ''} />
					<div className='absolute top-5.5 right-0 h-2 w-2 animate-pulse rounded-full border border-green-900 bg-green-500' />
				</div>
				<div className='flex flex-col'>
					<div className='text-[1rem] 2xl:text-[1.2rem]' id='chat-user-name'>
						{profile.name}
					</div>
					<div
						className='text-sidebar-primary/80 text-[0.8rem] 2xl:text-[1rem] dark:text-white'
						aria-label='User occupation'
					>
						{profile.occupation}
					</div>
				</div>
			</div>

			{/* Messages */}
			<div
				className='relative flex-1 overflow-y-auto px-2 py-2'
				role='log'
				aria-label='Chat messages'
				aria-live='polite'
			>
				{/* Fade overlay */}
				<div className='from-primary/20 dark:from-gray/5 pointer-events-none absolute top-0 left-0 z-50 h-50 w-full bg-gradient-to-b to-transparent' />

				<div className='flex flex-col'>
					{renderMessages}
					{/* last message */}
					{chat && <div ref={chat.messagesEndRef} aria-hidden='true' />}
				</div>
			</div>

			{/* Input field */}
			{chat && <ChatInput handleSend={chat.handleSend} />}
		</div>
	);
}
