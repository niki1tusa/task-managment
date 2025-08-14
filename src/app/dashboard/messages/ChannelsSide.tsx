'use client';

import clsx from 'clsx';
import { SquarePlus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { useChannelStore } from '@/store/channel.store';
import { useModalStore } from '@/store/modals.store';

import PartySide from './PartySide';
import type { TChannelRow } from './channel.types';

interface Props {
	channels: TChannelRow[];
}

export default function ChannelsSide({ channels }: Props) {
	const { open } = useModalStore();
	const [sortType, setSortType] = useState<'all' | 'group' | 'task' | 'direct'>('all');

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

	return (
		<div className='grid grid-cols-[3fr_2fr] border-r-2 xl:grid-cols-[1fr_200px]'>
			<div className='relative flex flex-col justify-between'>
				<div>
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

					<Tabs defaultValue='All' className='dark:bg-muted bg-gray w-full shadow-sm'>
						<TabsList className='grid w-full grid-cols-4 rounded-none border-b-2'>
							<TabsTrigger onClick={() => setSortType('all')} value='All'>
								All
							</TabsTrigger>
							<TabsTrigger onClick={() => setSortType('group')} value='Group'>
								Group
							</TabsTrigger>
							<TabsTrigger onClick={() => setSortType('task')} value='Task'>
								Task
							</TabsTrigger>
							<TabsTrigger onClick={() => setSortType('direct')} value='Direct'>
								Direct
							</TabsTrigger>
						</TabsList>
					</Tabs>

					<div className='mt-2 ml-5 flex flex-col items-start gap-2 overflow-y-auto py-2 pl-1'>
						{sortedChannels?.map(channel => {
							const isActive = activeChannel?.id === channel.id;
							return (
								<Button
									onClick={() => setActiveChannel(channel)}
									className={clsx(
										'bg-primary rounded-sm px-2 py-2 text-sm shadow shadow-neutral-400 transition-colors 2xl:text-lg dark:text-white',
										isActive
											? 'bg-primary text-white'
											: 'bg-primary/40 text-primary hover:bg-primary/50 dark:text-white/40'
									)}
									key={channel.id}
								>
									# {channel.name}
								</Button>
							);
						})}
					</div>
				</div>

				<div className='flex justify-center'>
					<button
						className='mb-4 rounded-sm bg-red-500 px-2 py-1 text-base text-white hover:bg-red-400'
						onClick={() => open('deleteChannel', activeChannel)}
						disabled={!activeChannel}
					>
						Delete
					</button>
				</div>

				{/* Fade overlay */}
				<div className='from-primary/10 dark:from-gray/5 pointer-events-none absolute bottom-0 left-0 z-50 h-8 w-full bg-gradient-to-t to-transparent' />
			</div>

			{/* Participants */}
			{activeChannel && <PartySide channel={activeChannel} />}
		</div>
	);
}
