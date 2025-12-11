'use client';

import { useMemo, useState } from 'react';

import FadeOverlay from '@/shared/ui/FadeOverlay';
import Skeleton from '@/shared/ui/Skeleton';
import { Title } from '@/shared/ui/Title';
import { AnimateIcon } from '@/shared/ui/animate-ui/icons/icon';
import { RotateCcw } from '@/shared/ui/animate-ui/icons/rotate-ccw';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/animate-ui/radix/tabs';
import Textarea from '@/shared/ui/fields/Textarea';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';

import NoticeList from './NoticeList';
import { useNotices } from '@/entities/notice/use-notices';

export default function NotificationClient() {
	// notice data
	const { notices, noticesIsError, noticesIsLoading } = useNotices();
	// sort state
	const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc');
	const [readOrNot, setReadOrNot] = useState<'not' | 'read'>('not');
	const [selectType, setSelectType] = useState<
		'all' | 'advice' | 'urgent' | 'achievement' | 'information'
	>('all');

	const resetAllFilters = () => {
		setOrderBy('asc');
		setReadOrNot('not');
		setSelectType('all');
	};
	const [query, setQuery] = useState('');

	//  filters and sorting:
	const filteredAndSorted = useMemo(() => {
		if (!notices) return [];
		//  time sorting
		const sorted =
			orderBy === 'desc'
				? [...notices].sort(
						(a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
					)
				: [...notices].sort(
						(a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
					);
		// read or not sorting
		const result =
			readOrNot === 'not'
				? sorted?.filter(notice => notice.status === false)
				: sorted.filter(notice => notice.status === true);
		// type sorting
		const activeNoticeType = (() => {
			switch (selectType) {
				case 'urgent':
					return result.filter(notice => notice.type === 'urgent');
				case 'advice':
					return result.filter(notice => notice.type === 'advice');
				case 'achievement':
					return result.filter(notice => notice.type === 'achievement');
				case 'information':
					return result.filter(notice => notice.type === 'information');
				default:
					return result;
			}
		})();
		// by word sorting
		const filterByWord = activeNoticeType.filter(notice =>
			notice.text.toLowerCase().includes(query.toLowerCase())
		);

		return filterByWord;
	}, [notices, orderBy, query, selectType, readOrNot]);

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
			<nav className='flex items-center gap-3'>
				{/* read or not  */}
				<Tabs value={readOrNot} onValueChange={value => setReadOrNot(value as 'read' | 'not')}>
					<TabsList className='ring-gray/40 bg-side grid grid-cols-2 shadow shadow-neutral-300 dark:shadow-none dark:ring-1'>
						<TabsTrigger value='not'>Not read</TabsTrigger>
						<TabsTrigger value='read'>Read</TabsTrigger>
					</TabsList>
				</Tabs>
				{/* select date */}
				<Select value={orderBy} onValueChange={value => setOrderBy(value as 'desc' | 'asc')}>
					<SelectTrigger className='bg-side w-[180px] shadow shadow-neutral-300 dark:shadow-none'>
						<SelectValue placeholder='Sort by date' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Date</SelectLabel>
							<SelectItem value='asc'>Asc</SelectItem>
							<SelectItem value='desc'>Desc</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				{/* select type */}
				<Select
					value={selectType}
					onValueChange={value =>
						setSelectType(value as 'all' | 'advice' | 'urgent' | 'achievement' | 'information')
					}
				>
					<SelectTrigger className='bg-side w-[180px] shadow shadow-neutral-300 dark:shadow-none'>
						<SelectValue placeholder='Select a type' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Type</SelectLabel>
							<SelectItem value='all'>All</SelectItem>
							<SelectItem value='advice'>Advice</SelectItem>
							<SelectItem value='urgent'>Urgent</SelectItem>
							<SelectItem value='achievement'>Achievement</SelectItem>
							<SelectItem value='information'>Information</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<button
					onClick={() => resetAllFilters()}
					title='Reset all filters'
					className='bg-side dark:hover:bg-input/50 flex items-center justify-center rounded-sm border p-1 shadow shadow-neutral-300 transition-all dark:shadow-none'
				>
					<AnimateIcon animateOnHover>
						<RotateCcw size={26} />
					</AnimateIcon>
				</button>
			</nav>
			{/* list */}
			{noticesIsLoading ? <Skeleton /> : <NoticeList notices={filteredAndSorted} />}
			<FadeOverlay />
		</section>
	);
}
