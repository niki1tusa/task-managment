'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import FadeOverlay from '@/components/ui/FadeOverlay';
import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/button/Button';
import Textarea from '@/components/ui/field/Textarea';

import { useProfile } from '@/hooks/useProfile';

import NoticeList from './NoticeList';
import type { TNoticeRow } from './notice.types';
import { getNoticesByProfileId } from '@/services/notice/notice-client.service';

export default function NotificationClient() {
	const [query, setQuery] = useState('');
	const [sortBy, setSortBy] = useState<'date' | 'type'>('date');
	const [sortRead, setSortRead] = useState<'read' | 'not'>('read');
	// 1) Всегда вызываем хук профиля
	const { profile, isLoading: profileLoading, isError: profileError } = useProfile();

	// 2) Всегда объявляем хук уведомлений (но включаем его только когда есть profile.id)
	const {
		data: notices,
		isLoading: noticesLoading,
		isError: noticesError,
	} = useQuery<TNoticeRow[]>({
		queryKey: ['notices', profile?.id],
		queryFn: () => getNoticesByProfileId(profile!.id),
		enabled: !!profile?.id,
	});

	const filteredAndSorted = useMemo(() => {
		if (!notices) return [];
		// фильтр прочитано/непрочитано
		const byRead = notices.filter(n =>
			sortRead === 'not' ? n.status === false : n.status === true
		);

		// текстовый поиск (по нескольким полям, по желанию можно расширить)
		const q = query.trim().toLowerCase();
		const byQuery = q ? byRead.filter(n => n.text.toLowerCase().includes(q)) : byRead;

		// сортировка
		const sorted = [...byQuery].sort((a, b) => {
			if (sortBy === 'date') {
				const at = new Date(a.created_at).getTime() || 0;
				const bt = new Date(b.created_at).getTime() || 0;
				return bt - at; // новые выше
			}
			// sortBy === 'type'
			return String(a.type ?? '').localeCompare(String(b.type ?? ''));
		});

		return sorted;
	}, [notices, sortRead, sortBy, query]);

	if (profileError || !profile) return null;
	if (noticesError || !notices) return null;

	return (
		<section className='relative flex h-full flex-col gap-6 px-5 pt-7'>
			<Title heading='page'>Notice</Title>

			{/* toolbar */}
			<div className='flex max-w-xl flex-col gap-3'>
				<Textarea value={query} setValue={setQuery} placeholder='Search by word…' />
				<Tabs
					value={sortBy}
					onValueChange={v => setSortBy(v as 'date' | 'type')}
					className='bg-gray dark:bg-muted w-full rounded-md shadow-sm'
				>
					<TabsList className='grid w-full grid-cols-2 rounded-md'>
						<TabsTrigger value='type'>Type</TabsTrigger>
						<TabsTrigger value='date'>Date</TabsTrigger>
					</TabsList>
				</Tabs>
				<section className='flex gap-1'>
					<Button className='w-full' onClick={() => setSortRead('not')}>
						Not read
					</Button>
					<Button className='w-full' onClick={() => setSortRead('read')}>
						Read
					</Button>
				</section>
			</div>

			{/* list */}
			{profileLoading || noticesLoading ? <Skeleton /> : <NoticeList notices={filteredAndSorted} />}
			<FadeOverlay />
		</section>
	);
}
