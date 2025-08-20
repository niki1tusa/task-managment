import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import type { TChannelInsert } from '@/components/pages/messages/channel/channel.types';
import { Button } from '@/components/ui/Button';
import Textarea from '@/components/ui/field/Textarea';

import type { TProfileRow } from '@/shared/types/task/task.types';

import ProfileList from './ProfileList';
import { useProfileList } from './useProfileList';
import {
	createClientChannelDirect,
	createClientChannelGroup,
} from '@/services/channel/channel-client.service';

interface Props {
	close: () => void;
	profile: TProfileRow;
	typeChannel: string;
	setOpenList?: (arg: boolean) => void;
	mutateFnc?: (arg: any) => void;
	isPending?: boolean;
}
export default function ProfileModalList({
	profile,
	typeChannel,
	setOpenList,
	close,
	mutateFnc,
	isPending,
}: Props) {
	const {
		type,
		profiles,
		participantIds,
		nameChannel,
		setNameChannel,
		selectProfileIds,
		profilesData,
		setSelectProfileIds,
	} = useProfileList(profile);
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
			setSelectProfileIds([]);
		}
	};
	const handleCreateDirect = (profileDirect: TProfileRow) => {
		mutateChannelDirect({ fields: { name: nameChannel, created_by: profile.id }, profileDirect });
		setNameChannel('');
		setSelectProfileIds([]);
	};
	const handleAddProfile = (profileToAdd: TProfileRow) => {
		if (!selectProfileIds.some(p => p === profileToAdd.id)) {
			setSelectProfileIds([...selectProfileIds, profileToAdd.id]);
		}
	};
	const handleRemoveProfile = (profileToAdd: TProfileRow) => {
		const filtered = selectProfileIds.filter(id => id !== profileToAdd.id);
		setSelectProfileIds([...filtered]);
	};
	const isAddProfileModal = type === 'insertProfileInChannel';
	return (
		<div className='flex max-h-[60vh] h-auto flex-col justify-start gap-2'>
			<span className='flex gap-2 py-2 text-base font-medium'>
				<span>Choice profile:</span>
				<span>
					{isAddProfileModal
						? participantIds.size + selectProfileIds.length
						: selectProfileIds.length}
					/{typeChannel === 'group' ? 30 : 1}
				</span>
			</span>
			{typeChannel === 'group' && !isAddProfileModal && (
				<Textarea value={nameChannel} setValue={setNameChannel} />
			)}

			<ProfileList
				typeChannel={typeChannel}
				profiles={profiles}
				handleAddProfile={handleAddProfile}
				handleRemoveProfile={handleRemoveProfile}
				selectProfileIds={selectProfileIds}
			/>
			{setOpenList ? (
				<div className='flex w-full gap-3 px-4 py-2'>
					<Button
						disable={selectProfileIds.length < 1}
						onClick={() => {
							typeChannel === 'group'
								? handleCreateGroup(selectProfileIds)
								: handleCreateDirect(
										profilesData?.find(profile => profile.id === selectProfileIds[0])!
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
			) : (
				mutateFnc && (
					<div className='flex gap-4'>
						<Button disable={isPending} onClick={() => mutateFnc(selectProfileIds)}>
							Save
						</Button>
						<Button onClick={close}>Close</Button>
					</div>
				)
			)}
		</div>
	);
}
