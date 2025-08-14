'use client';

import clsx from 'clsx';
import { SquarePlus } from 'lucide-react';
import { useEffect, useState } from 'react';

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
	const [sortType, setSortType] = useState<string>('all');
	const sortedChannels =
		sortType === 'all' ? channels : channels.filter(channel => channel.type === sortType);
	const defaultChannel = channels.find(channel => channel.name === 'General');
	const [activeChannelId, setActiveChannelId] = useState(defaultChannel?.id);

	const findActiveChannel = channels.find(channel => channel.id === activeChannelId);
	const { activeChannel, setActiveChannel } = useChannelStore();

	useEffect(() => {
		if (!activeChannel && channels.length > 0) {
			setActiveChannel(findActiveChannel || defaultChannel!);
		}
	}, [activeChannel, channels, setActiveChannel]);
	return (
		<div className='grid grid-cols-[3fr_2fr] border-r-2'>
			<div className='flex flex-col justify-between'>
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
					<div className='mt-5 ml-5 flex flex-col items-start gap-2 overflow-y-auto py-2 pl-1'>
						{sortedChannels?.map(channel => (
							<Button
								onClick={() => setActiveChannelId(channel.id)}
								className={clsx(
									'bg-primary rounded-sm px-2 py-2 text-sm shadow shadow-neutral-400 transition-colors 2xl:text-lg dark:text-white',
									activeChannelId === channel.id
										? 'bg-primary text-white'
										: 'bg-primary/40 text-primary hover:bg-primary/50 dark:text-white/40'
								)}
								key={channel.id}
							>
								# {channel.name}
							</Button>
						))}
					</div>
				</div>

				<div className='flex justify-center'>
					<button
						className='mb-7 rounded-sm bg-red-500 px-2 py-1 text-base text-white hover:bg-red-400'
						onClick={() => open('deleteChannel', findActiveChannel)}
					>
						Delete
					</button>
				</div>
			</div>
			{/*Participants  */}
			<PartySide channel={findActiveChannel!} />
		</div>
	);
}
