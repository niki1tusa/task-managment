'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { TChatMessageRow } from '@/shared/types/task/task.types';

import { createClient } from '@/utils/supabase/client';

export const useChat = () => {
	const supabase = useRef(createClient());
	const [messages, setMessages] = useState<TChatMessageRow[]>([]);

	useEffect(() => {
		const client = supabase.current;
		client
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

		const channel = client
			.channel('chat_message')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'chat_message' },
				async payload => {
					const { data } = await client
						.from('chat_message')
						.select(`*, profile:profile(id,name, avatar_path)`)
						.eq('id', payload.new.id)
						.single();
					if (data) {
						setMessages(prev => {
							if (prev.some(msg => msg.id === data.id)) return prev;
							return [...prev, data];
						});
					}
				}
			)
			.subscribe();
		return () => {
			client.removeChannel(channel);
		};
	}, []);

	const messagesEndRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	const handleSend = async (text: string) => {
		if (!text.trim()) return;

		const { data: userData } = await supabase.current.auth.getUser();
		if (!userData?.user) return;

		const { error } = await supabase.current
			.from('chat_message')
			.insert({ text, user_id: userData.user.id });

		if (error) {
			console.error('Failed to send message:', error.message);
			return;
		}
	};
	return { messages, messagesEndRef, handleSend };
};
