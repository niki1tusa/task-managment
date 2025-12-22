/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import type { ProfileRow } from '@/shared/model/task-types';
import { useTaskStore } from '@/shared/store/task-store';
import { Button } from '@/shared/ui/buttons/Button';

import ProfileList from '@/features/messages/modals/profile-modal-list/ProfileList';

interface Props {
	close: () => void;
	profile: ProfileRow;
	setOpenList?: (arg: boolean) => void;
	mutateFnc?: (arg: any) => void;
	isPending?: boolean;
}
export default function TeamModalProfileListForSubtask({ close, mutateFnc, isPending }: Props) {
	const [selectProfileId, setSelectProfileId] = useState<string | null>(null);
	const { activeTask } = useTaskStore();
	// all profiles
	const profiles = activeTask?.task_participants.flatMap(i => i.profile) ?? [];
	// handle
	const handleAddProfile = (profileToAdd: ProfileRow) => {
		setSelectProfileId(profileToAdd.id);
	};
	const handleRemoveProfile = () => {
		setSelectProfileId(null);
	};
	return (
		<div className='flex h-auto max-h-[60vh] flex-col justify-start gap-2'>
			<span className='flex gap-2 py-2 text-base font-medium'>
				<span>Choice profile:</span>
				<span> {selectProfileId ? 1 : 0}/1</span>
			</span>
			<ProfileList
				profiles={profiles}
				handleAddProfile={handleAddProfile}
				handleRemoveProfile={handleRemoveProfile}
				selectProfileId={selectProfileId}
			/>

			{mutateFnc && (
				<div className='flex gap-4'>
					<Button disabled={isPending} onClick={() => mutateFnc(selectProfileId)}>
						Save
					</Button>
					<Button onClick={close}>Close</Button>
				</div>
			)}
		</div>
	);
}
/* eslint-enable @typescript-eslint/no-explicit-any */
