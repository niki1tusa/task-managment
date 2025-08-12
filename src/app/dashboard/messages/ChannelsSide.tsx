'use client';

import clsx from 'clsx';
import { SquarePlus } from 'lucide-react';
import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import { Button } from '@/components/ui/Button';
import { Title } from '@/components/ui/Title';

import { useModalStore } from '@/store/modals.store';

import type { TChannelRow } from './channel.types';
import PartySide from './PartySide';

interface Props {
	channels: TChannelRow[];
}
export default function ChannelsSide({ channels }: Props) {
	const { open } = useModalStore();
	const [sortType, setSortType] = useState<string>('all');
	const sortedChannels =
		sortType === 'all' ? channels : channels.filter(channel => channel.type === sortType);
	
	return (
		<div className='border-r-2 grid grid-cols-[3fr_2fr]'>
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
			<div className='mt-1 border-t-2' />
			<Tabs defaultValue='All' className='dark:bg-muted bg-gray w-full'>
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
			<div className='mt-5 ml-5 flex flex-col items-start gap-2'>
				{sortedChannels?.map((channel, i) => (
					<Button
						className={clsx(
							'bg-primary rounded-sm px-2 py-2 text-sm shadow shadow-neutral-400 transition-colors 2xl:text-lg dark:text-white',
							i < 1
								? 'bg-primary text-white'
								: 'bg-primary/40 text-primary hover:bg-primary/50 dark:text-white/40'
						)}
						key={i}
					>
						# {channel.name}
					</Button>
				))}
			</div>	
			</div>
			{/*Participants  */}
			<PartySide />
		</div>
	);
}
