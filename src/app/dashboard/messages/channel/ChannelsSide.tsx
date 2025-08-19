'use client';

import clsx from 'clsx';
import { EllipsisVertical, SquarePlus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';
import Textarea from '@/components/ui/field/Textarea';

import { useChannelStore } from '@/store/channel.store';
import { useModalStore } from '@/store/modals.store';

import ChannelTabs from '../filters/ChannelTabs';
import PartySide from '../party/PartySide';

import ChannelMenuPopover from './ChannelMenuPopover';
import type { TChannelRow } from './channel.types';

interface Props {
	channels: TChannelRow[];
}

export default function ChannelsSide({ channels }: Props) {
	const { open } = useModalStore();
	const [sortType, setSortType] = useState<'all' | 'group' | 'task' | 'direct'>('all');
	const [searchChannelByName, setSearchChannelByName] = useState('');
	const [isShowChannelMenu, setIsShowChannelMenu] = useState(false);
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
	//  search channel
	const handleSearch = searchChannelByName
		? sortedChannels.filter(channel =>
				channel.name?.toLowerCase().includes(searchChannelByName.trim().toLowerCase())
			)
		: sortedChannels;
	return (
		<div className='grid h-full min-h-0 grid-cols-[3fr_2fr] border-r-2 xl:grid-cols-[1fr_200px]'>
			<div className='relative flex h-full min-h-0 flex-col justify-between'>
				<div>
					{/* header */}
					<div className='mx-5 mt-7 flex items-center justify-between'>
						<Title heading='page'>Channels</Title>
						<button
							type='button'
							onClick={() => {
								open('createChannel');
							}}
						>
							<SquarePlus />
						</button>
					</div>
					<div className='mt-1 border-t-2 shadow-sm' />
					{/* filters */}
					<ChannelTabs setSortType={setSortType} />
					<div className='mt-2 mr-2 ml-5'>
						<Textarea
							value={searchChannelByName}
							setValue={setSearchChannelByName}
							className='focus:ring-primary/40 w-full transition-colors focus:ring-1'
							rounded='rounded'
							placeholder='Search channel by name...'
						/>
					</div>
					{/* channels */}
					<div className='mt-2 mr-2 ml-5 flex flex-col items-start gap-2 overflow-y-auto rounded border p-2 py-2 pl-1 2xl:max-h-[1100px] shadow shadow-neutral-400'>
						{handleSearch?.map(channel => {
							const isActive = activeChannel?.id === channel.id;
							return (
								<div
									onClick={() => setActiveChannel(channel)}
									key={channel.id}
									className={clsx(isActive && 'bg-gray/40 flex  justify-between rounded-sm', 'hover:bg-gray/10 transition-colors w-full')}
								>
									<Button
										className={clsx(
											'bg-primary m-1 rounded-sm px-2 py-2 text-sm shadow shadow-neutral-400 transition-colors 2xl:text-lg dark:text-white',
											isActive
												? 'bg-primary text-white'
												: 'bg-primary/40 text-primary hover:bg-primary/50 dark:hover:bg-primary/80 dark:text-white/40'
										)}
									>
										# {channel.name}
									</Button>
									{isActive && (
										<div className='flex items-center'>
											<EllipsisVertical
												className='mr-5'
												size={22}
												onClick={() => setIsShowChannelMenu(true)}
											/>
											{isShowChannelMenu && (
												<ChannelMenuPopover
													activeChannel={activeChannel}
													setIsShowChannelMenu={setIsShowChannelMenu}
												/>
											)}
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>

				{/* Fade overlay */}
				<div className='from-primary/10 dark:from-gray/5 pointer-events-none absolute bottom-0 left-0 z-50 h-8 w-full bg-gradient-to-t to-transparent' />
			</div>

			{/* Participants */}
		 <PartySide channel={activeChannel || null} />
		</div>
	);
}
