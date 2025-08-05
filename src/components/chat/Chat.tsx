'use client';

import { Paperclip } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { TChatMessageRow, TProfileRow } from '@/shared/types/task/task.types';

import { createClient } from '@/utils/supabase/client';

import { AnimateIcon } from '../animate-ui/icons/icon';
import { SendIcon } from '../animate-ui/icons/send';
import { Avatar } from '../ui/Avatar';

import ChatMessage from './ChatMessage';

export default function Chat({ data }: { data: TProfileRow }) {
	const supabase = useRef(createClient());
	const [messages, setMessages] = useState<TChatMessageRow[]>([]);
	const [text, setText] = useState('');

	useEffect(() => {
		supabase.current
			.from('chat_message')
			.select(
				`*, profile:profile(
					id,
					name,
					avatar_path)`
			)
			.order('created_at', { ascending: true })
			.then(({ data }) => {
				if (!data) return;
				setMessages(data);
			});

		const channel = supabase.current
			.channel('chat_message')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'chat_message' },
				async payload => {
					const { data } = await supabase.current
						.from('chat_message')
						.select(`*, profile:profile(id,name, avatar_path)`)
						.eq('id', payload.new.id)
						.single();
					if (data) {
						setMessages(prev => [...prev, data]);
					}
				}
			)
			.subscribe();
		return () => {
			supabase.current.removeChannel(channel);
		};
	}, []);

	const handleSend = async () => {
		if (!text.trim()) return;

		const { data: userData } = await supabase.current.auth.getUser();
		if (!userData?.user) return;

		const { data, error } = await supabase.current
			.from('chat_message')
			.insert({ text, user_id: userData.user.id });

		if (error) {
			console.error('Failed to send message:', error.message);
			return;
		}

		setText('');
	};

	const messagesEndRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);
	return (
		<aside className='fixed z-10 flex h-screen flex-col'>
			{/* Header image */}

			<div className='h-[300px] w-full'>
				<Image
					alt='chat'
					src='/chat.jpg'
					width={305}
					height={100}
					className='chat-header-img h-full w-full object-cover'
				/>
			</div>

			{/* User info */}
			<div className='bg-primary/40 flex h-16 w-full flex-shrink-0 items-center gap-3 pl-10 font-semibold 2xl:h-30'>
				<Avatar img={data.avatar_path || ''} />
				<div className='flex flex-col'>
					<div className='text-[1rem] 2xl:text-[1.2rem]'>{data.name}</div>
					<div className='text-[0.8rem] 2xl:text-[1rem]'>occupation</div>
				</div>
			</div>

			{/* Messages */}
			<div className='flex-1 overflow-y-auto px-2 py-2'>
				<div className='flex flex-col gap-3'>
					{messages.map(m => (
						<ChatMessage key={m.id} message={m} />
					))}
					<div ref={messagesEndRef} />
				</div>
			</div>

			{/* Input field */}
			<div className='bg-primary/40 flex w-full flex-shrink-0 items-center justify-between px-4 py-3 text-[1rem] 2xl:px-8 2xl:text-xl'>
				<div className='flex flex-1 items-center gap-2'>
					<button type='button'>
						<Paperclip />
					</button>
					<input
						type='text'
						placeholder='Enter your message...'
						value={text}
						onChange={e => setText(e.target.value)}
						className='w-full bg-transparent outline-none'
						onKeyDown={e => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault();
								handleSend();
							}
						}}
					/>
				</div>
				<AnimateIcon animateOnHover>
					<button
						onClick={handleSend}
						className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-400/20 transition-colors hover:opacity-50'
					>
						<SendIcon size={22} className='text-white' />
					</button>
				</AnimateIcon>
			</div>
		</aside>
	);
}
