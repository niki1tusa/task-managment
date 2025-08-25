'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { BadgeCheck, BookOpenText, CircleAlert, HandHelping } from 'lucide-react';
import {  useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import { Title } from '@/components/ui/Title';
import Textarea from '@/components/ui/field/Textarea';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { getNoticesByProfileId } from '@/services/notice/notice-client.service';
import { getProfile } from '@/services/profile/profile-client.service';

export default function NotificationClient() {
	const [query, setQuery] = useState('');
	const [sortBy, setSortBy] = useState<'date' | 'type'>('date');
	const [checked, setChecked] = useState<Record<string, boolean>>({});
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
		queryKey: ['notices', profile?.id ?? 'none'],
		queryFn: () => getNoticesByProfileId(profile!.id),
		enabled: !!profile?.id, // не делает запрос до появления id
	});

	// 3) Дальше можно условно рендерить (хуки уже вызваны)
	if (profileLoading) return null; // или скелетон
	if (profileError || !profile) return null; // обработай как нужно

	if (noticesLoading) return null; // или скелетон
	if (noticesError || !notices) return null; // обработай как нужно

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
			</div>

			{/* list */}
			<ul className='flex flex-col gap-3'>
				{notices.map(n => {
					return (
						<li key={n.id} className='grid grid-cols-[auto_1fr_auto] items-start gap-3'>
							{/* checkbox */}
							<div className='pt-2'>
								<label className='inline-flex cursor-pointer items-center gap-2'>
									<input
										type='checkbox'
										className='peer sr-only'
										onChange={() => setChecked(m => ({ ...m, [n.id]: !m[n.id] }))}
									/>
									<span
										className={clsx(
											'inline-flex h-5 w-5 items-center justify-center rounded border'
										)}
									></span>
								</label>
							</div>

							{/* card */}
							<div
								className={clsx(
									'min-w-0 rounded-lg border p-4 shadow-sm ring-1 ring-transparent transition-shadow dark:bg-gray-700'
								)}
							>
								<div className='flex items-start gap-3'>
									<span className='mt-0.5 shrink-0'>{/* <Icon size={22} /> */}</span>
									<p
										className='line-clamp-2 min-w-0 text-sm leading-6 text-gray-900 dark:text-gray-100'
										title={n.text}
									>
										{n.text}
									</p>
								</div>
							</div>

							{/* date pill */}
							<div
								className={clsx(
									'flex items-center self-stretch rounded-md bg-white px-3 py-2 text-xs shadow-sm shadow-neutral-400 dark:bg-gray-700'
								)}
							>
								{n.created_at}
							</div>
						</li>
					);
				})}
				{/* 
				{items.length === 0 && (
					<li className='rounded-md border border-dashed p-6 text-sm text-gray-600'>
						Nothing found. Try another query.
					</li>
				)} */}
			</ul>
		</section>
	);
}
