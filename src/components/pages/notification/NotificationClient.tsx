'use client';

import { useMemo, useState } from 'react';

import FadeOverlay from '@/components/ui/FadeOverlay';
import Skeleton from '@/components/ui/Skeleton';
import { Title } from '@/components/ui/Title';
import Textarea from '@/components/ui/field/Textarea';

import { useNotices } from '@/hooks/useNotices';

import NoticeList from './NoticeList';
import SelectNotice from './SelectNotice';

export default function NotificationClient() {
	// notice data
	const { notices, noticesIsError, noticesIsLoading } = useNotices();
	// sort state
	const [query, setQuery] = useState('');

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
			{/* search */}
			<div className='w-[400px] 2xl:w-[600px]'>
				<Textarea
					className='w-full'
					value={query}
					setValue={setQuery}
					placeholder='Search by word…'
				/>
			</div>
			{/* sort toolbar */}
			<SelectNotice />
			{/* list */}
			{noticesIsLoading ? <Skeleton /> : <NoticeList notices={filteredAndSorted} />}
			<FadeOverlay />
		</section>
	);
}
