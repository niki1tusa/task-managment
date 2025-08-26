'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/button/Button';
import Textarea from '@/components/ui/field/Textarea';

import type { TProfileRow } from '@/shared/types/task/task.types';

import NoticeList from './NoticeList';
import { getNoticesByProfileId } from '@/services/notice/notice-client.service';
import { getProfile } from '@/services/profile/profile-client.service';

export default function NotificationClient() {
	const [query, setQuery] = useState('');
	const [sortBy, setSortBy] = useState<'date' | 'type'>('date');
	const [sortRead, setSortRead] = useState<'read' | 'not'>('read');
	// 1) Всегда вызываем хук профиля
	const {
		data: profile,
		isLoading: profileLoading,
		isError: profileError,
	} = useQuery<TProfileRow>({
		queryKey: ['profile'],
		queryFn: () => getProfile(),
	});

	// 2) Всегда объявляем хук уведомлений (но включаем его только когда есть profile.id)
	const {
		data: notices,
		isLoading: noticesLoading,
		isError: noticesError,
	} = useQuery({
		queryKey: ['notices', profile?.id],
		queryFn: () => getNoticesByProfileId(profile!.id),
		enabled: !!profile?.id,
	});

	useEffect(() => {
	
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
	}, [sortBy, notices]);
	let filterNotices;
	useEffect(() => {
		if (notices?.length === 0) {
			filterNotices = [];
		} else {
			filterNotices = notices?.filter(notice =>
				sortRead === 'not' ? notice.status === false : notice.status === true
			);
		}
	}, [sortRead, notices]);
	if (profileLoading) return <Skeleton />;
	if (profileError || !profile) return null;

	if (noticesLoading) return <Skeleton />;
	if (noticesError || !notices) return null;

	return (
		<section className='mx-5 my-7 flex flex-col gap-6'>
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
			<NoticeList notices={filterNotices} />
		</section>
	);
}
