import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Checkbox } from '@/components/animate-ui/base/checkbox';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import Textarea from '@/components/ui/field/Textarea';

import type { TProfileRow } from '@/shared/types/task/task.types';

import type { TChannelInsert } from '../channel/channel.types';

import {
	createClientChannelDirect,
	createClientChannelGroup,
} from '@/services/channel/channel-client.service';
import { getAllProfile, getProfile } from '@/services/profile/profile-client.service';
import { useChannelStore } from '@/store/channel.store';

interface Props {
	close: () => void;
	profile: TProfileRow;
	typeChannel: string;
	setOpenList?: (arg: boolean) => void;
	mutateFnc?: (arg: any)=>void
	isPending?: boolean
}
// TODO: здесь не нужен props profile
export default function ProfileList({ profile, typeChannel, setOpenList, close, mutateFnc, isPending }: Props) {

	const [addProfileArr, setAddProfileArr] = useState<string[]>([]);
	const [nameChannel, setNameChannel] = useState('');
	// profiles
	const { data: profilesData } = useQuery<TProfileRow[]>({
		queryKey: ['profiles/all'],
		queryFn: () => getAllProfile(),
	});
	console.log(profilesData);
	const profiles = profilesData?.filter(item => item.id !== profile?.id);
	// create channel
	const { mutate: mutateChannelGroup } = useMutation({
		mutationFn: ({ fields, profilesId }: { fields: TChannelInsert; profilesId: string[] }) =>
			createClientChannelGroup(fields, profilesId),
		onSuccess: () => {
			toast.success('Channel group is success created!');
			close();
		},
	});
	const { mutate: mutateChannelDirect } = useMutation({
		mutationFn: ({
			fields,
			profileDirect,
		}: {
			fields: TChannelInsert;
			profileDirect: TProfileRow;
		}) => createClientChannelDirect(fields, profileDirect),
		onSuccess: () => {
			toast.success('Channel direct is success created!');
			close();
		},
	});
	// handle
	const handleCreateGroup = (profilesId: string[]) => {
		if (nameChannel.length < 1) {
			toast.error('Min symbol is one in name channel!');
		} else {
			mutateChannelGroup({ fields: { name: nameChannel, created_by: profile.id }, profilesId });
			setNameChannel('');
			setAddProfileArr([]);
		}
	};
	const handleCreateDirect = (profileDirect: TProfileRow) => {
		mutateChannelDirect({ fields: { name: nameChannel, created_by: profile.id }, profileDirect });
		setNameChannel('');
		setAddProfileArr([]);
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
			{typeChannel === 'group' && <Textarea value={nameChannel} setValue={setNameChannel} />}

			<ul className='dark:bg-gray flex flex-col overflow-y-auto rounded-lg border-2 bg-[#f6f4ff] px-4'>
				{profiles?.map((p: TProfileRow) => (
					<li key={p.id} className='flex items-center justify-between border-b-2 py-2.5'>
						<div className='flex items-center gap-3'>
							<Avatar img={p.avatar_path || ''} />
							<span className='text-sm'>{p.name}</span>
						</div>
						<Checkbox
							className={'bg-white'}
							disabled={
								!addProfileArr.includes(p.id) &&
								(typeChannel === 'group' ? addProfileArr.length === 30 : addProfileArr.length === 1)
							}
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
			{setOpenList ? (
				<div className='flex w-full gap-3 px-4 py-2'>
					<Button
						disable={addProfileArr.length < 1}
						onClick={() => {
							typeChannel === 'group'
								? handleCreateGroup(addProfileArr)
								: handleCreateDirect(
										profilesData?.find(profile => profile.id === addProfileArr[0])!
									);
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
			) : mutateFnc && (
				<div className='flex gap-4'>
					<Button disable={isPending} onClick={() => mutateFnc(addProfileArr)} >
						Save
					</Button>
					<Button onClick={close}>No</Button>
				</div>
			)}
		</div>
	);
}
