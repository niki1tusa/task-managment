'use client';

import { useMemo, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import FadeOverlay from '@/components/ui/FadeOverlay';
import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';
import { Button } from '@/components/ui/button/Button';
import Textarea from '@/components/ui/field/Textarea';

import { useNotices } from '@/hooks/useNotices';

import NoticeList from './NoticeList';

export default function NotificationClient() {
	// notice data
	const { notices, noticesIsError, noticesIsLoading } = useNotices();
	// sort state
	const [query, setQuery] = useState('');
	const [sortBy, setSortBy] = useState<'date' | 'type'>('date');
	const [sortRead, setSortRead] = useState<'read' | 'not'>('read');
	//  filters and sorting:
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

	if (noticesIsError || !notices) return null;

	return (
		<section className='relative flex h-full flex-col gap-6 px-5 pt-7'>
			<Title heading='page'>Notice</Title>

			<div className='2xl:w-[600px] w-[400px]'>
				<Textarea className='w-full' value={query} setValue={setQuery} placeholder='Search by word…' />
			</div>

			<div className='flex w-full gap-10'>
				{/* toolbar */}
				<div className='flex max-w-xl flex-col gap-3'>
					<nav className='rind-2 flex flex-col items-start ring-neutral-400 ring-offset-2'>
						<Tabs
							className='w-full'
							value={sortRead}
							onValueChange={v => setSortRead(v as 'read' | 'not')}
						>
							<TabsList className='grid h-20 w-full grid-rows-2'>
								<TabsTrigger value='not'>Not read</TabsTrigger>
								<TabsTrigger value='read'>Read</TabsTrigger>
							</TabsList>
						</Tabs>
						<hr className='my-2 h-2 w-full' />
						<Tabs className='bg-gray dark:bg-muted w-full rounded-md shadow-sm'>
							<TabsList className='grid h-50 w-full grid-rows-5 rounded-md'>
								<TabsTrigger value='urgent'>urgent</TabsTrigger>
								<TabsTrigger value='advice'>advice</TabsTrigger>
								<TabsTrigger value='achivment'>achivment</TabsTrigger>
								<TabsTrigger value='information'>inforamtion</TabsTrigger>
							</TabsList>
						</Tabs>
						<hr className='my-2 h-2 w-full' />
						<Tabs className='w-full'>
							<TabsList className='grid h-20 w-full grid-rows-2'>
								<TabsTrigger value='new'>date asc</TabsTrigger>
								<TabsTrigger value='old'>date desc</TabsTrigger>
							</TabsList>
						</Tabs>
					</nav>
				</div>

				{/* list */}
				{noticesIsLoading ? <Skeleton /> : <NoticeList notices={filteredAndSorted} />}
				<FadeOverlay />
			</div>
		</section>
	);
}
