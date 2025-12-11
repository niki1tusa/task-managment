'use client';

import clsx from 'clsx';
import { EllipsisVertical, SquarePlus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { useChannelStore } from '@/shared/store/channel-store';
import { useModalStore } from '@/shared/store/modals-store';
import Skeleton from '@/shared/ui/Skeleton';
import { Title } from '@/shared/ui/Title';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/animate-ui/base/popover';
import { Button } from '@/shared/ui/buttons/Button';
import Textarea from '@/shared/ui/fields/Textarea';
import ChannelMenuPopover from '@/shared/ui/popover/ChannelMenuPopover';

import ChannelTabs from '../../features/messages/ChannelTabs';
import PartySide from '../../features/messages/PartySide';

import type { TChannelRow } from './channel.types';

interface Props {
	channels: TChannelRow[];
	isLoading: boolean;
}

export default function ChannelsSide({ channels, isLoading }: Props) {
	const { open } = useModalStore();
	const [sortType, setSortType] = useState<'all' | 'group' | 'task' | 'direct'>('all');
	const [searchChannelByName, setSearchChannelByName] = useState('');
	const [openId, setOpenId] = useState<string | null>(null);
	// store:
	const activeChannel = useChannelStore(state => state.activeChannel);
	const setActiveChannel = useChannelStore(state => state.setActiveChannel);

	// sortedChannels мемоизируем для производительности
	const sortedChannels = useMemo(() => {
		if (sortType === 'all') return channels || [];
		return (channels || []).filter(ch => ch.type === sortType);
	}, [channels, sortType]);

	// default channel: first channel named "General" или первый по списку
	const defaultChannel = useMemo(
		() => channels?.find(c => c.name === 'General') ?? channels?.[0] ?? null,
		[channels]
	);

	// Инициализация / синхронизация activeChannel на изменение channels
	useEffect(() => {
		// если стор пуст и есть доступные каналы — установить дефолт
		if (!activeChannel && defaultChannel) {
			setActiveChannel(defaultChannel);
			return;
		}

		// если текущий activeChannel больше не в списке — заменить на дефолт
		if (activeChannel && channels && !channels.some(c => c.id === activeChannel.id)) {
			if (defaultChannel) setActiveChannel(defaultChannel);
			else setActiveChannel(channels?.[0] ?? null);
		}
	}, [channels, defaultChannel, activeChannel, setActiveChannel]);
	useEffect(() => {
		setOpenId(null);
	}, [activeChannel?.id]);
	//  search channel
	const handleSearch = searchChannelByName
		? sortedChannels.filter(channel =>
				channel.name?.toLowerCase().includes(searchChannelByName.trim().toLowerCase())
			)
		: sortedChannels;
	return (
		<div className='grid h-full min-h-0 grid-cols-[4fr_2fr] border-r-2'>
			{/* ЛЕВАЯ КОЛОНКА */}
			<div className='relative h-full min-h-0 overflow-hidden'>
				{/* ВАЖНО: делаем эту обёртку flex-колонкой, чтобы ниже flex-1 заработал */}
				<div className='flex h-full min-h-0 flex-col'>
					{/* header (фиксированный блок, НЕ скроллится) */}
					<div className='mx-5 mt-7 flex items-center justify-between'>
						<Title heading='page'>Channels</Title>
						<button type='button' onClick={() => open('createChannel')}>
							<SquarePlus />
						</button>
					</div>
					<div className='mt-1 border-t-2 shadow-sm' />

					{/* filters (фикcированный блок) */}
					<ChannelTabs setSortType={setSortType} />

					{/* search (фикcированный блок) */}
					<div className='mx-5 mt-2'>
						<Textarea
							value={searchChannelByName}
							setValue={setSearchChannelByName}
							className='focus:ring-primary/40 w-full transition-colors focus:ring-1'
							rounded='rounded'
							placeholder='Search channel by name...'
						/>
					</div>

					{/* СКРОЛЛЯЩАЯСЯ ЧАСТЬ */}
					<div className='mx-5 mt-2 mb-2 min-h-0 flex-1'>
						<div className='shadow-default h-full min-h-0 overflow-y-auto rounded border p-2'>
							{isLoading ? (
								<Skeleton length={1} className='w-full px-8' />
							) : (
								handleSearch?.map(channel => {
									const isActive = activeChannel?.id === channel.id;
									return (
										<div
											key={channel.id}
											onClick={() => setActiveChannel(channel)}
											className={clsx(
												'hover:bg-gray/10 w-full transition-colors',
												isActive && 'bg-gray/40 flex justify-between rounded-sm'
											)}
										>
											<Button
												className={clsx(
													'shadow-default m-1 w-auto px-5 py-3 text-sm transition-colors 2xl:text-lg dark:text-white',
													isActive
														? 'bg-primary text-white'
														: 'bg-primary/40 text-primary hover:bg-primary/50 dark:hover:bg-primary/80 dark:text-white/40'
												)}
											>
												# {channel.name}
											</Button>

											{isActive && (
												<div className='flex items-center'>
													<Popover
														open={openId === channel.id}
														onOpenChange={(v: boolean) => setOpenId(v ? channel.id : null)}
													>
														<PopoverTrigger
															render={
																<button
																	type='button'
																	className='mr-5 p-1'
																	onClick={e => e.stopPropagation()}
																	aria-haspopup='menu'
																>
																	<EllipsisVertical size={22} />
																</button>
															}
														/>
														<PopoverContent
															side='bottom'
															align='end'
															sideOffset={8}
															className='bg-background shadow-default w-[240px] rounded-sm border p-3 dark:bg-white'
														>
															<ChannelMenuPopover
																activeChannel={channel}
																onClose={() => setOpenId(null)}
															/>
														</PopoverContent>
													</Popover>
												</div>
											)}
										</div>
									);
								})
							)}
						</div>
					</div>
				</div>

				{/* декоративный градиент — ок, он absolute и вне потока */}
				<div className='from-primary/10 dark:from-gray/5 pointer-events-none absolute bottom-0 left-0 z-50 h-8 w-full bg-gradient-to-t to-transparent' />
			</div>

			{/* ПРАВАЯ КОЛОНКА */}
			<PartySide channel={activeChannel || null} />
		</div>
	);
}
