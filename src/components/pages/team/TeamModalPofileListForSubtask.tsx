import { useState } from 'react';

import ProfileList from '@/components/modals/channel/profile-modal-list/ProfileList';
import { Button } from '@/components/ui/button/Button';

import type { TProfileRow } from '@/shared/types/task/task.types';

import { useTaskStore } from '@/store/task.store';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Props {
	close: () => void;
	profile: TProfileRow;
	setOpenList?: (arg: boolean) => void;
	mutateFnc?: (arg: any) => void;
	isPending?: boolean;
}
export default function TeamModalPofileListForSubtask({ close, mutateFnc, isPending }: Props) {
	const [selectProfileId, setSelectProfileId] = useState<string | null>(null);
	const { activeTask } = useTaskStore();
	// all profiles
	const profiles = activeTask?.task_participants.flatMap(i => i.profile) ?? [];
	// handle
	const handleAddProfile = (profileToAdd: TProfileRow) => {
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
					<Button disable={isPending} onClick={() => mutateFnc(selectProfileId)}>
						Save
					</Button>
					<Button onClick={close}>Close</Button>
				</div>
			)}
		</div>
	);
}
