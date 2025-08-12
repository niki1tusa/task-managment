import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Checkbox } from '@/components/animate-ui/base/checkbox';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

import type { TProfileRow } from '@/shared/types/task/task.types';

import type { TChannelInsert } from '../channel.types';

import {
	createClientChannelDirect,
	createClientChannelGroup,
} from '@/services/channel/channel-client.service';
import { getAllProfile } from '@/services/profile/profile-client.service';

interface Props {
	close: () => void;
	profile: TProfileRow;
	typeChannel: string;
	setOpenList: (arg: boolean) => void;
}
export default function ProfileList({ profile, typeChannel, setOpenList, close }: Props) {
	const [addProfileArr, setAddProfileArr] = useState<string[]>([]);
	const [nameChannel, setNameChannel] = useState('');
	const { data: profiles } = useQuery({
		queryKey: ['profiles'],
		queryFn: () => getAllProfile(),
	});
	const { mutate: mutateChannelGroup } = useMutation({
		mutationFn: ({ fields, profilesId }: { fields: TChannelInsert; profilesId: string[] }) =>
			createClientChannelGroup(fields, profilesId),
		onSuccess: () => {
			toast.success('Channel group is success created!');
			close();
		},
	});
	const { mutate: mutateChannelDirect } = useMutation({
		mutationFn: ({ fields, profileId }: { fields: TChannelInsert; profileId: string }) =>
			createClientChannelDirect(fields, profileId),
		onSuccess: () => {
			toast.success('Channel direct is success created!');
			close();
		},
	});
	const handleCreateGroup = (profilesId: string[]) => {
		if (nameChannel.length < 1) {
			toast.error('Min symbol is one in name channel!');
		} else {
			mutateChannelGroup({ fields: { name: nameChannel, created_by: profile.id }, profilesId });
			setNameChannel('');
			setAddProfileArr([]);
		}
	};
	const handleCreateDirect = (profileId: string) => {
		if (nameChannel.length < 1) {
			toast.error('Min symbol is one in name channel!');
		} else {
			mutateChannelDirect({ fields: { name: nameChannel, created_by: profile.id }, profileId });
			setNameChannel('');
			setAddProfileArr([]);
			
		}
	};
	const handleAddProfile = (profileToAdd: TProfileRow) => {
		if (!addProfileArr.some(p => p === profileToAdd.id)) {
			setAddProfileArr([...addProfileArr, profileToAdd.id]);
		}
	};
	const handleRemoveProfile = (profileToAdd: TProfileRow) => {
		const filtered = addProfileArr.filter(id => id !== profileToAdd.id);
		setAddProfileArr([...filtered]);
	};
	return (
		<div className='grid h-[70vh] max-h-[60vh] grid-rows-[auto_1fr_auto] gap-2'>
			<span className='flex gap-2 py-2 text-base font-medium'>
				<span>Choice profile:</span>
				<span>
					{addProfileArr.length}/{typeChannel === 'group' ? 30 : 1}
				</span>
			</span>
			<textarea
				rows={1}
				placeholder={`Enter ${typeChannel} name...`}
				value={nameChannel}
				onChange={e => setNameChannel(e.target.value)}
				className='flex-1 resize-none rounded-lg bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 shadow shadow-neutral-400 outline-none dark:bg-gray-700 dark:placeholder-gray-500'
			/>

			<ul className='bg-background flex flex-col overflow-y-auto rounded-lg border-2 px-4'>
				{profiles?.map((p: TProfileRow) => (
					<li key={p.id} className='flex items-center justify-between border-b-2 py-2.5'>
						<div className='flex items-center gap-3'>
							<Avatar img={p.avatar_path || ''} />
							<span className='text-sm'>{p.name}</span>
						</div>
						{/* TODO: после того как я убираю галочку, profile не убирается из addProfileArr */}
						<Checkbox
							checked={addProfileArr.includes(p.id)}
							onCheckedChange={checked => {
								if (checked) {
									handleAddProfile(p);
								} else {
									handleRemoveProfile(p);
								}
							}}
						/>
					</li>
				))}
			</ul>

			<div className='flex w-full gap-3 px-4 py-2'>
				<Button
					onClick={() => {
						typeChannel === 'group'
							? handleCreateGroup(addProfileArr)
							: handleCreateDirect(addProfileArr[0]);
					}}
				>
					Create
				</Button>
				<Button
					onClick={() => {
						setOpenList(false);
						setNameChannel('');
					}}
				>
					Back
				</Button>
			</div>
		</div>
	);
}
