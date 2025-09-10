'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/animate-ui/components/tabs';
import { Title } from '@/components/ui/Title';

export default function TeamPageClient() {
	return (
		<div className='relative h-full px-5 pt-7'>
			<Title heading='page'>Team</Title>
			<Tabs className='rounded-sm shadow-sm mt-5 grid w-[70%]' value='owner'>
				<TabsList className='bg-primary/50 flex w-full'>
					<TabsTrigger
						value='owner'
						className='flex data-[state=active]:text-black data-[state=inactive]:text-white'
					>
						Owner
					</TabsTrigger>
					<TabsTrigger
						value='participants'
						className='flex data-[state=active]:text-black data-[state=inactive]:text-white'
					>
						Participants
					</TabsTrigger>
					<TabsTrigger
						value='completed'
						className='flex data-[state=active]:text-black data-[state=inactive]:text-white'
					>
						Completed
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
